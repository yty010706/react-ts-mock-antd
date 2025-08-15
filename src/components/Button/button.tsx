import classNames from 'classnames';
import React from 'react';

export type ButtonSize = 'small' | 'large';
export type ButtonType = 'primary' | 'danger' | 'link' | 'default' | 'dashed';

export interface ButtonProps {
  className?: string;
  /** 按钮类型*/
  btnType?: ButtonType;
  /** 按钮尺寸*/
  size?: ButtonSize;
  children?: React.ReactNode;
  /** 按钮禁用*/
  disabled?: boolean;
  /** link button的链接地址*/
  href?: string;
  onClick?: () => void;
}

/**
 * 页面上常见的按钮元素，用于完成特定的交互。支持HTML Button和a链接形式，具备多种类型和尺寸
 * ## 引入方式
 * ```tsx
 * import {Button} from 'mockAntD'
 * <Button btnType='primary' size='large'>Button</Button>
 */
export const Button = ({
  btnType = 'default',
  size,
  disabled = false,
  className,
  children,
  href,
  ...props
}: ButtonProps) => {
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    ['disabled']: btnType === 'link' && disabled,
  });

  if (btnType === 'link' && href)
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  else {
    return (
      <button className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
};

export default Button;
