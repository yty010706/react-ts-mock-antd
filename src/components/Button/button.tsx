import classNames from 'classnames';
import React from 'react';

export type ButtonSize = 'small' | 'large';
export type ButtonType = 'primary' | 'danger' | 'link' | 'default' | 'dashed';

interface BaseButtonProps {
  className: string;
  btnType: ButtonType;
  size: ButtonSize;
  children: React.ReactNode;
}
export type ButtonProps = Partial<
  BaseButtonProps &
    React.ButtonHTMLAttributes<HTMLElement> &
    React.LinkHTMLAttributes<HTMLElement>
>;
const Button: React.FC<ButtonProps> = props => {
  const {
    btnType = 'default',
    size,
    disabled = false,
    className,
    children,
    href,
    ...restProps
  } = props;
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    ['disabled']: btnType === 'link' && disabled,
  });

  if (btnType === 'link' && href)
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

export default Button;
