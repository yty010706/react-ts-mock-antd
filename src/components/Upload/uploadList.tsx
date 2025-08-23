import Icon from '../Icon';
import Progress from './progress';
import { UploadFile } from './upload';

export interface UploadListProps {
  files: UploadFile[];
  removeUploadFile: (file: UploadFile) => void;
}

const statusIconMap = {
  ready: <Icon icon="spinner" spin />,
  uploading: <Icon icon="spinner" spin />,
  success: <Icon icon="check" />,
  error: <Icon icon="exclamation-circle" />,
};
export default function UploadList({
  files,
  removeUploadFile,
}: UploadListProps) {
  return (
    <ul className="upload-list">
      {files.map(file => (
        <li className={`upload-list-item-${file.status}`} key={file.uid}>
          <div className="item-content">
            <span> {file.name}</span>
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
