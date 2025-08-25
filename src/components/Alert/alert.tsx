import classNames from 'classnames';
import {
  ReactNode,
  useState,
  ReactElement,
  FunctionComponent,
  CSSProperties,
} from 'react';
import Icon, { IconProps } from '../Icon/icon';

type AlertType = 'success' | 'default' | 'danger' | 'warning';

/** Alert 警告提示属性 */
export interface AlertProps {
  /** 警告提示标题 */
  title?: string | ReactNode;
  /** 警告提示描述 */
  description?: string | ReactNode;
  /** 警告类型 */
  type?: AlertType;
  /** 关闭时的回调函数 */
  onClose?: () => void;
  /** 是否可关闭 */
  closable?: boolean;
  /** 自定义关闭图标 */
  closeIcon?: ReactNode;
  /** 自定义样式 */
  style?: CSSProperties;
}

/**
 * 警告提示，展现需要关注的信息。
 *
 * ### 何时使用
 *
 * - 当某个页面需要向用户显示警告的信息时
 * - 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭
 *
 * ### 示例
 *
 * 基础用法
 * ```tsx
 * <Alert title="提示标题" description="这是提示的描述信息" />
 * ```
 *
 * 不同类型
 * ```tsx
 * <Alert title="成功提示" type="success" description="这是成功信息的描述" />
 * <Alert title="错误提示" type="danger" description="这是错误信息的描述" />
 * <Alert title="警告提示" type="warning" description="这是警告信息的描述" />
 * ```
 *
 * 可关闭的提示
 * ```tsx
 * <Alert title="可关闭提示" closable description="这是可关闭提示的描述" />
 * ```
 *
 * 自定义关闭图标
 * ```tsx
 * import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 * import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
 *
 * <Alert
 *   title="自定义图标"
 *   closeIcon={<FontAwesomeIcon icon={faInfoCircle} />}
 *   closable
 *   description="这是自定义关闭图标的提示"
 * />
 * ```
 */
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
    <>
      {!hide && (
        <div className={alertClasses} data-testid="alert" {...props}>
          <div className={alertTitleClasses}>{title}</div>
          {description && (
            <div className="alert-description">{description}</div>
          )}
          {closable && (
            <div
              className="alert-close"
              onClick={() => {
                setHide(true);
                onClose?.();
              }}
            >
              {renderClose()}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Alert;
