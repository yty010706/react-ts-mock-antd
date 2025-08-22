import { ChangeEvent, useRef, useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import Button from '../Button';
import Icon from '../Icon';
import UploadList from './uploadList';

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  status?: UploadFileStatus;
  percentage?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  /**上传的地址 */
  action: string;
  /** 上传前对文件校验或处理 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 上传中的回调 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传状态变更回调 */
  onChange?: (file: File) => void;
  /** 上传成功回调 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败回调 */
  onError?: (err: any, file: File) => void;
  /** 删除已上传文件回调 */
  onRemove?: (file: File) => void;
  /** 批量上传 */
  multiple?: boolean;
}
export default function Upload({
  action,
  beforeUpload,
  onProgress,
  onChange,
  onSuccess,
  onError,
  onRemove,
  multiple,
}: UploadProps) {
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);

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
          result && postData(file);
        }
      } else {
        postData(file);
      }
    });
  };

  const postData = (file: File) => {
    const newFile = createUploadFile(file);
    const data = new FormData();
    data.append(file.name, file);
    axios
      .post(action, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e: AxiosProgressEvent) => {
          let percentage = Math.round((e.loaded * 100) / e.total!) || 0;
          if (percentage < 100) {
            updateUploadFile(newFile, { percentage, status: 'uploading' });
            onProgress?.(percentage, file);
          }
        },
      })
      .then(res => {
        onChange?.(file);
        onSuccess?.(res.data, file);
        updateUploadFile(newFile, {
          percentage: 100,
          status: 'success',
          response: res.data,
        });
      })
      .catch(err => {
        onChange?.(file);
        onError?.(err, file);
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
    setUploadFileList([...uploadFileList, newFile]);

    return newFile;
  };

  const updateUploadFile = (
    file: UploadFile,
    uploadProps: Partial<UploadFile>
  ) => {
    setUploadFileList(prevList => {
      return prevList.map(prev => {
        if (prev.uid === file.uid) {
          return { ...prev, ...uploadProps };
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
    axios.delete(`${action}/${file.uid}`).then(_ => {
      onRemove?.(file.raw!);
    });
  };

  return (
    <div className="upload">
      <Button btnType="default" onClick={handleClick}>
        <Icon icon="upload" className="upload-icon" />
        上传文件
      </Button>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={selectFiles}
        multiple={multiple}
      />
      <UploadList files={uploadFileList} removeUploadFile={removeUploadFile} />
    </div>
  );
}
