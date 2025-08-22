import Icon from '../Icon';
import Transition from '../Transition';
import { UploadFile } from './upload';

interface UploadListProps {
  files: UploadFile[];
  removeUploadFile: (file: UploadFile) => void;
}

const UploadItem = ({ file, removeUploadFile }: any) => {
  return (
    <Transition in={file.percentage > 0} timeout={300} animation="zoom-in-top">
      <li
        className={`upload-list-item-${
          file.status === 'ready' ? 'uploading' : file.status
        }`}
        key={file.uid}
      >
        <span> {file.name}</span>
        <span>
          <Icon
            icon="close"
            className="close-icon"
            onClick={() => removeUploadFile(file)}
          />
          <Icon icon="check" className="status-icon" />
        </span>
      </li>
    </Transition>
  );
};
export default function UploadList({
  files,
  removeUploadFile,
}: UploadListProps) {
  return (
    <ul className="upload-list">
      {files.map(file => (
        <UploadItem file={file} removeUploadFile={removeUploadFile} />
      ))}
    </ul>
  );
}
