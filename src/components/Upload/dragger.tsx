import { CSSProperties, DragEvent, ReactNode, useState } from 'react';
import cls from 'classnames';

interface DraggerProps {
  /** 拖拽区域 */
  children?: ReactNode;
  /** 拖拽区域样式 */
  style?: CSSProperties;
  /** 拖拽区域类名 */
  className?: string;
  /** 文件释放回调 */
  onFile: (file: FileList) => void;
}

export function Dragger({ onFile, children }: DraggerProps) {
  const [dragOver, setDragOver] = useState(false);
  const classes = cls('dragger', {
    'is-dragover': dragOver,
  });
  const handleDrag = (e: DragEvent<HTMLDivElement>, over: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(over);
  };
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={classes}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}
