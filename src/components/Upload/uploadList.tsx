import Icon from '../Icon';
import Progress from './progress';
import { UploadFile } from './upload';

export interface UploadListProps {
  /**
   * 文件列表
   */
  files: UploadFile[];
  /**
   * 删除文件回调
   */
  removeUploadFile: (file: UploadFile) => void;
}

const statusIconMap = {
  ready: <Icon icon="spinner" spin />,
  uploading: <Icon icon="spinner" spin />,
  success: <Icon icon="check" />,
  error: <Icon icon="exclamation-circle" />,
};

/**
 * UploadList 上传文件列表组件
 *
 * 展示上传文件的状态和进度，支持删除文件操作。
 * 根据文件的不同状态显示相应的图标和进度条。
 */
export default function UploadList({
  files,
  removeUploadFile,
}: UploadListProps) {
  return (
    <ul className="upload-list">
      {files.map(file => (
        <li className={`upload-list-item-${file.status}`} key={file.uid}>
          <div className="item-content">
            <span>{file.name}</span>
            <span className="close-icon" onClick={() => removeUploadFile(file)}>
              <Icon icon="close" />
            </span>
            <span className="status-icon">{statusIconMap[file.status!]}</span>
          </div>

          {(file.status === 'uploading' || file.status === 'ready') && (
            <Progress percent={file.percentage || 0} strokeHeight={12} />
          )}
        </li>
      ))}
    </ul>
  );
}
