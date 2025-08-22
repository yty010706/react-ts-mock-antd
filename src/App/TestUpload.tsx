import Upload from '@/components/Upload';
import { UploadProps } from '@/components/Upload/upload';

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 500) {
    return Promise.reject('不支持上传大小超过500kb的文件');
  }
  return true;
};

const renameFile = (file: File) => {
  const newFile = new File(
    [file],
    file.name.replace(/\.[\w]+$/, '') + '-rename',
    { type: file.type }
  );
  return Promise.resolve(newFile);
};

const defaultProps: UploadProps = {
  action: 'https://jsonplaceholder.typicode.com/posts',
  onProgress: (percentage: Number) => {
    console.log(percentage);
  },
  onSuccess: (res: any, file: File) => {
    console.log(res, file.name);
  },
  onError: (err: any, file: File) => {
    console.log(err, file.name);
  },
  onChange: (file: File) => {
    console.log(file.name);
  },
  beforeUpload: checkFileSize,
};
export default function TestUpload() {
  return (
    <>
      <Upload {...defaultProps} />
    </>
  );
}
