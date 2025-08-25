import { ChangeEvent, CSSProperties, ReactNode, useRef, useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import UploadList from './uploadList';
import { Dragger } from './dragger';

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  /**
   * 文件唯一标识
   */
  uid: string;
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件大小
   */
  size: number;
  /**
   * 上传状态
   */
  status?: UploadFileStatus;
  /**
   * 上传进度百分比
   */
  percentage?: number;
  /**
   * 原始文件对象
   */
  raw?: File;
  /**
   * 上传响应数据
   */
  response?: unknown;
  /**
   * 上传错误信息
   */
  error?: unknown;
}

export interface UploadProps {
  /**
   * 上传的地址
   */
  action: string;
  /**
   * 默认上传文件列表
   */
  defaultFileList?: UploadFile[];
  /**
   * 上传前对文件校验或处理
   */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**
   * 上传中的回调
   */
  onProgress?: (percentage: number, file: File) => void;
  /**
   * 上传状态变更回调
   */
  onChange?: (file: UploadFile) => void;
  /**
   * 上传成功回调
   */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**
   * 上传失败回调
   */
  onError?: (err: any, file: UploadFile) => void;
  /**
   * 删除已上传文件回调
   */
  onRemove?: (file: UploadFile) => void;
  /**
   * 批量上传
   */
  multiple?: boolean;
  /**
   * 限制可以上传的文件
   */
  accept?: string;
  /**
   * 上传文件的键名
   */
  name?: string;
  /**
   * 自定义请求头
   */
  headers?: { [key: string]: any };
  /**
   * 自定义上传数据
   */
  data?: { [key: string]: any };
  /**
   * 是否携带cookie
   */
  withCredentials?: boolean;
  /**
   * 支持拖拽上传
   */
  drag?: boolean;
  /**
   * 自定义上传触发元素
   */
  children?: ReactNode;
  /**
   * 自定义样式
   */
  style?: CSSProperties;
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * Upload 文件上传组件
 *
 * 支持普通上传和拖拽上传两种方式，可以显示上传进度、处理上传结果，并支持删除已上传文件。
 * 组件基于 axios 实现文件上传功能，提供了丰富的回调接口来处理上传过程中的各种状态。
 *
 * ```tsx
 * <Upload
 *   action="/api/upload"
 *   onProgress={(percentage, file) => console.log(`上传进度: ${percentage}%`)}
 *   onSuccess={(data, file) => console.log('上传成功', data)}
 *   onError={(err, file) => console.log('上传失败', err)}
 * >
 *   <Button>点击上传</Button>
 * </Upload>
 * ```
 */
export default function Upload({
  action,
  defaultFileList,
  beforeUpload,
  onProgress,
  onChange,
  onSuccess,
  onError,
  onRemove,
  multiple = false,
  accept,
  name,
  headers,
  data,
  withCredentials = false,
  drag = false,
  children,
  style,
}: UploadProps) {
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>(
    defaultFileList || []
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const selectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      uploadFiles(files);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const uploadFiles = (files: FileList) => {
    const uploadFiles = Array.from(files);
    uploadFiles.forEach(file => {
      if (beforeUpload) {
        const result = beforeUpload(file);
        if (result instanceof Promise) {
          result
            .then(processedFile => {
              postData(processedFile);
            })
            .catch(err => alert(err));
        } else {
          if (result) {
            postData(file);
          }
        }
      } else {
        postData(file);
      }
    });
  };

  const postData = (file: File) => {
    const newFile = createUploadFile(file);
    const formData = new FormData();
    formData.append(name || 'uploadFile', file);
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }

    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
        onUploadProgress: (e: AxiosProgressEvent) => {
          const percentage = Math.round((e.loaded * 100) / e.total!) || 0;
          if (percentage < 100) {
            updateUploadFile(newFile, { percentage, status: 'uploading' });
            onProgress?.(percentage, file);
          }
        },
        withCredentials,
      })
      .then(res => {
        onChange?.(newFile);
        onSuccess?.(res.data, newFile);
        updateUploadFile(newFile, {
          percentage: 100,
          status: 'success',
          response: res.data,
        });
      })
      .catch(err => {
        onChange?.(newFile);
        onError?.(err, newFile);
        updateUploadFile(newFile, {
          percentage: 100,
          status: 'error',
          error: err,
        });
      });
  };

  const createUploadFile = (file: File) => {
    const newFile: UploadFile = {
      uid: Date.now().toString(),
      name: file.name,
      size: file.size,
      status: 'ready',
      percentage: 0,
      raw: file,
    };
    setUploadFileList(prevList => [...prevList, newFile]);

    return newFile;
  };

  const updateUploadFile = (
    file: UploadFile,
    uploadProps: Partial<UploadFile>
  ) => {
    setUploadFileList(prevList => {
      return prevList.map(prev => {
        if (prev.uid === file.uid) {
          file = { ...file, ...uploadProps };
          return file;
        }
        return prev;
      });
    });
  };
  const handleClick = () => {
    inputRef.current?.click();
  };

  const removeUploadFile = (file: UploadFile) => {
    setUploadFileList(uploadFileList.filter(f => f.uid !== file.uid));
    axios.delete(`${action}/${file.uid}`).then(() => {
      onRemove?.(file);
    });
  };

  return (
    <div className="upload" style={style} data-testid="test-upload">
      <div className="upload-input" onClick={handleClick}>
        {drag ? <Dragger onFile={uploadFiles}>{children}</Dragger> : children}
      </div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={selectFiles}
        multiple={multiple}
        accept={accept}
      />
      <UploadList files={uploadFileList} removeUploadFile={removeUploadFile} />
    </div>
  );
}
