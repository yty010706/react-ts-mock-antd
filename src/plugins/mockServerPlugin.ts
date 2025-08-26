import { Plugin, ViteDevServer } from 'vite';
import { faker } from '@faker-js/faker';
import { IncomingMessage, ServerResponse } from 'http';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve(__dirname, '../../uploads');
const chunkDir = path.resolve(uploadDir, 'chunks');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(chunkDir)) {
  fs.mkdirSync(chunkDir, { recursive: true });
}

// 已上传分片的信息
const uploadedChunks: Record<string, number[]> = {};

const generateMockUserList = () => {
  const count = faker.number.int({ min: 5, max: 10 });
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    age: faker.number.int({ min: 1, max: 100 }),
  }));
};

// 解析请求体
const parseForm = (
  req: IncomingMessage
): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      multiples: true,
      uploadDir: chunkDir,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

// 处理分片上传检查
const handleCheckChunks = (
  _req: IncomingMessage,
  res: ServerResponse,
  uid: string
) => {
  res.setHeader('content-type', 'application/json');
  res.end(
    JSON.stringify({
      uploadedChunks: uploadedChunks[uid] || [],
    })
  );
};

// 处理分片上传
const handleChunkUpload = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { fields, files } = await parseForm(req);
    const uid = Array.isArray(fields.uid) ? fields.uid[0] : fields.uid;
    const chunkIndex = Array.isArray(fields.chunkIndex)
      ? parseInt(fields.chunkIndex[0])
      : parseInt(fields.chunkIndex);

    // 获取上传的分片文件
    const chunkFile = Array.isArray(files.chunk) ? files.chunk[0] : files.chunk;

    // 为分片文件创建新的路径，以 uid 和索引命名
    const newChunkPath = path.resolve(chunkDir, `${uid}-${chunkIndex}`);

    // 移动临时文件到新的位置
    fs.renameSync(chunkFile.filepath, newChunkPath);

    // 记录已上传的分片
    if (!uploadedChunks[uid]) {
      uploadedChunks[uid] = [];
    }

    if (!uploadedChunks[uid].includes(chunkIndex)) {
      uploadedChunks[uid].push(chunkIndex);
    }

    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: 'Chunk uploaded successfully',
        chunkIndex,
      })
    );
  } catch (error: any) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: 'Failed to upload chunk',
        details: error.message,
      })
    );
  }
};

// 处理分片合并
const handleMergeChunks = async (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { uid, filename, totalChunks } = JSON.parse(body);
      const filePath = path.resolve(uploadDir, filename);
      const writeStream = fs.createWriteStream(filePath);

      // 按顺序合并所有分片
      for (let i = 0; i < totalChunks; i++) {
        const chunkFilePath = path.resolve(chunkDir, `${uid}-${i}`);
        if (fs.existsSync(chunkFilePath)) {
          const chunkData = fs.readFileSync(chunkFilePath);
          writeStream.write(chunkData);
        } else {
          throw new Error(`Missing chunk file: ${chunkFilePath}`);
        }
      }

      writeStream.end();

      // 等待写入完成
      await new Promise((resolve, reject) => {
        writeStream.on('finish', () => resolve(null));
        writeStream.on('error', reject);
      });

      // 清理分片文件
      for (let i = 0; i < totalChunks; i++) {
        const chunkFilePath = path.resolve(chunkDir, `${uid}-${i}`);
        if (fs.existsSync(chunkFilePath)) {
          fs.unlinkSync(chunkFilePath);
        }
      }

      // 清理分片记录
      delete uploadedChunks[uid];

      res.setHeader('content-type', 'application/json');
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: 'File merged successfully',
          url: `/uploads/${filename}`,
          size: fs.statSync(filePath).size,
        })
      );
    } catch (error: any) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: 'Failed to merge chunks',
          details: error.message,
        })
      );
    }
  });
};

// 处理文件删除
const handleDeleteFile = (
  _req: IncomingMessage,
  res: ServerResponse,
  uid: string
) => {
  // 删除分片记录
  delete uploadedChunks[uid];

  res.setHeader('content-type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ message: 'File deleted successfully' }));
};

const handleNormalUpload = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { fields, files } = await parseForm(req);

    // 处理上传的文件
    const processedFiles: Record<string, any> = {};
    for (const [fieldName, fileData] of Object.entries(files)) {
      const file = Array.isArray(fileData) ? fileData[0] : fileData;
      const newFilePath = path.resolve(
        uploadDir,
        file.originalFilename || file.newFilename
      );

      // 移动文件到最终位置
      fs.renameSync(file.filepath, newFilePath);

      processedFiles[fieldName] = {
        filename: file.originalFilename,
        size: file.size,
        filepath: newFilePath,
      };
    }

    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: 'File uploaded successfully',
        fields,
        files: processedFiles,
      })
    );
  } catch (error: any) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({ error: 'Failed to upload file', details: error.message })
    );
  }
};

const MockServerPlugin = (): Plugin => {
  return {
    name: 'mock-server-plugin',
    configureServer: (server: ViteDevServer) => {
      // AutoComplete 异步加载mock接口
      server.middlewares.use('/api/userList', (_req, res) => {
        // 模拟异步的延时
        setTimeout(() => {
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify(generateMockUserList()));
        }, 500);
      });

      // Upload 分片上传/断点续传mock接口
      server.middlewares.use('/api/upload', (req, res, next) => {
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const { pathname } = url;
        const { method } = req;

        console.log(`[Mock Server] Received request: ${method} ${pathname}`);

        // 检查已上传的分片
        if (method === 'GET' && pathname.startsWith('/chunks/')) {
          const uid = pathname.split('/').pop() || '';
          console.log(`[Mock Server] Checking chunks for UID: ${uid}`);
          handleCheckChunks(req, res, uid);
          return;
        }

        // 上传分片
        if (method === 'POST' && pathname === '/chunk') {
          console.log('[Mock Server] Uploading chunk');
          handleChunkUpload(req, res);
          return;
        }

        // 合并分片
        if (method === 'POST' && pathname === '/merge') {
          console.log('[Mock Server] Merging chunks');
          handleMergeChunks(req, res);
          return;
        }

        // 删除文件
        if (method === 'DELETE' && pathname.match(/^[^\/]+$/)) {
          const uid = pathname.split('/').pop() || '';
          console.log(`[Mock Server] Deleting file with UID: ${uid}`);
          handleDeleteFile(req, res, uid);
          return;
        }

        // 普通上传接口
        if (method === 'POST' && pathname === '/api/upload') {
          console.log('[Mock Server] Uploading file');
          handleNormalUpload(req, res);
          return;
        }

        console.log(`[Mock Server] No match found for: ${method} ${pathname}`);
        next();
      });
    },
  };
};

export default MockServerPlugin;
