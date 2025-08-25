import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';

export type ButtonSize = 'small' | 'large' | 'normal';
export type ButtonType = 'primary' | 'danger' | 'link' | 'default' | 'dashed';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** 自定义类名 */
  className?: string;
  /** 按钮类型 */
  btnType?: ButtonType;
  /** 原生按钮类型 */
  type?: 'button' | 'submit' | 'reset';
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 子元素 */
  children?: React.ReactNode;
  /** 禁用状态 */
  disabled?: boolean;
  /** 链接地址 */
  href?: string;
  /** 图标 */
  icon?: ReactNode;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 点击事件 */
  onClick?: () => void;
}

/**
 * 页面上常见的按钮元素，用于完成特定的交互。支持 HTML Button 和 a 链接形式，具备多种类型和尺寸
 *
 * ### 示例
 *
 * 基础按钮
 * ```tsx
 * import { Button } from 'mockAntD'
 * <Button btnType='primary' size='large'>Button</Button>
 * ```
 *
 * 链接按钮
 * ```tsx
 * <Button btnType='link' href='https://example.com'>Link Button</Button>
 * ```
 *
 * 带图标按钮
 * ```tsx
 * import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 * import { faCheck } from '@fortawesome/free-solid-svg-icons'
 * <Button btnType='primary' icon={<FontAwesomeIcon icon={faCheck} />}>Confirm</Button>
 * ```
 *
 * 禁用按钮
 * ```tsx
 * <Button disabled>Disabled Button</Button>
 * ```
 */
export const Button = ({
  btnType = 'default',
  size = 'normal',
  disabled = false,
  className,
  children,
  href,
  icon,
  ...props
}: ButtonProps) => {
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    ['disabled']: btnType === 'link' && disabled,
  });

  if (btnType === 'link' && href)
    return (
      <a href={href} className={classes} target="_blank">
        {children}
      </a>
    );
  else {
    return (
      <button className={classes} disabled={disabled} {...props}>
        {icon && <span className="btn-icon">{icon}</span>}
        {children}
      </button>
    );
  }
};

export default Button;
