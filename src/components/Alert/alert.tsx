import classNames from 'classnames';
import { useState } from 'react';

export type AlertType = 'success' | 'default' | 'danger' | 'warning';
interface BaseAlertProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  type: AlertType;
  onClose: () => void;
  closable: boolean;
}
type AlertProps = Partial<BaseAlertProps>;
const Alert: React.FC<AlertProps> = props => {
  const {
    title = 'this is title',
    description = '',
    type = 'default',
    closable = true,
    onClose,
  } = props;
  const [hide, setHide] = useState(false);

  const alertClasses = classNames('alert', {
    [`alert-${type}`]: type,
  });
  const alertTitleClasses = classNames('alert-title', {
    ['border-title']: description,
  });

  return (
    <>
      {!hide && (
        <div className={alertClasses}>
          <div className={alertTitleClasses}>{title}</div>
          {description && (
            <div className="alert-description">{description}</div>
          )}
          {closable && (
            <div
              className="alert-close"
              onClick={() => {
                setHide(true);
                onClose && onClose();
              }}
            >
              ×
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Alert;
