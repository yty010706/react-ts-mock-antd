import React, { ChangeEvent, useMemo } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon';

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLElement>,
    'size' | 'prefix' | 'suffix'
  > {
  /** 尺寸 */
  size?: 'sm' | 'lg';
  /** 禁用 */
  disabled?: boolean;
  /** 图标 */
  icon?: IconProp;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 输入框变化事件 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  size,
  disabled = false,
  icon,
  prefix,
  suffix,
  className,
  onChange,
  ...props
}: InputProps) => {
  const classes = useMemo(() => {
    return classNames('input', className, {
      disabled: disabled,
      [`input-${size}`]: size,
      'input-icon': icon,
      [`input-icon-${size}`]: size && icon,
      'input-has-prefix': prefix,
      'input-has-suffix': suffix,
    });
  }, [size, icon, disabled, prefix, suffix, className]);
  const prefixClass = size ? `input-prefix-${size}` : 'input-prefix';
  const suffixClass = size ? `input-suffix-${size}` : 'input-suffix';

  return (
    <div className="input-wrapper">
      {prefix && <div className={prefixClass}>{prefix}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} className="icon" />
        </div>
      )}
      <input
        type="text"
        {...props}
        disabled={disabled}
        className={classes}
        onChange={onChange}
      />
      {suffix && <div className={suffixClass}>{suffix}</div>}
    </div>
  );
};

export default Input;
