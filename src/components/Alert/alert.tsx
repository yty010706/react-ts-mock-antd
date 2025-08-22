import classNames from 'classnames';
import { ReactNode, useState, ReactElement, FunctionComponent } from 'react';
import Icon, { IconProps } from '../Icon/icon';
import Transition from '../Transition';

type AlertType = 'success' | 'default' | 'danger' | 'warning';
interface BaseAlertProps {
  title: string | ReactNode;
  description: string | ReactNode;
  type: AlertType;
  onClose: () => void;
  closable: boolean;
  closeIcon: ReactNode;
  style?: React.CSSProperties;
}
export type AlertProps = Partial<BaseAlertProps>;
const Alert = ({
  title = 'this is title',
  description = '',
  type = 'default',
  closable = true,
  onClose,
  closeIcon,
  ...props
}: AlertProps) => {
  const [hide, setHide] = useState(false);

  const alertClasses = classNames('alert', {
    [`alert-${type}`]: type,
  });
  const alertTitleClasses = classNames('alert-title', {
    ['border-title']: description,
  });

  const renderClose = () => {
    if (closeIcon) {
      const icon = closeIcon as ReactElement<
        IconProps,
        FunctionComponent<IconProps>
      >;
      if (icon.type.displayName === 'Icon') {
        return closeIcon;
      }
    }
    return <Icon icon="close" />;
  };

  return (
    <Transition in={hide} timeout={300} animation="zoom-out-top">
      <div className={alertClasses} data-testid="alert" {...props}>
        <div className={alertTitleClasses}>{title}</div>
        {description && <div className="alert-description">{description}</div>}
        {closable && (
          <div
            className="alert-close"
            onClick={() => {
              setHide(true);
              onClose && onClose();
            }}
          >
            {renderClose()}
          </div>
        )}
      </div>
    </Transition>
  );
};

export default Alert;
