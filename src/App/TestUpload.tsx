import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Upload from '@/components/Upload';
import { UploadFile, UploadProps } from '@/components/Upload/upload';

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50000) {
    return Promise.reject('不支持上传大小超过500kb的文件');
  }
  return true;
};

const defaultProps: UploadProps = {
  action: 'https://jsonplaceholder.typicode.com/posts',
  name: 'file',
  headers: { author: 'yty' },
  onProgress: (percentage: Number) => {
    console.log(percentage);
  },
  onSuccess: (res: any, file: UploadFile) => {
    console.log(res, file.name);
  },
  onError: (err: any, file: UploadFile) => {
    console.log(err, file.name);
  },
  onChange: (file: UploadFile) => {
    console.log(file.name);
  },
  beforeUpload: checkFileSize,
  multiple: true,
  style: { marginLeft: 5, marginTop: 5 },
};
export default function TestUpload() {
  return (
    <>
      <Upload {...defaultProps}>
        <Button btnType="default" icon={<Icon icon="upload" />}>
          上传文件
        </Button>
      </Upload>
      <Upload {...defaultProps} drag>
        <Icon icon="upload" size="3x" theme="primary" />
        <span>拖拽文件以上传</span>
      </Upload>
    </>
  );
}
