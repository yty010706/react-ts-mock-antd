import React, { ChangeEvent, useMemo } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon';

/** Input 输入框属性 */
export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLElement>,
    'size' | 'prefix' | 'suffix'
  > {
  /** 输入框尺寸 */
  size?: 'sm' | 'lg';
  /** 是否禁用 */
  disabled?: boolean;
  /** 输入框图标 */
  icon?: IconProp;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 输入框变化事件 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ### 何时使用
 *
 * - 需要用户输入表单域内容时
 * - 提供组合型输入框，带搜索的输入框，可以进行大小选择
 *
 * ### 示例
 *
 * 基础用法
 * ```tsx
 * <Input placeholder="请输入内容" />
 * ```
 *
 * 不同尺寸
 * ```tsx
 * <Input size="sm" placeholder="小尺寸" />
 * <Input size="lg" placeholder="大尺寸" />
 * ```
 *
 * 禁用状态
 * ```tsx
 * <Input disabled placeholder="禁用状态" />
 * ```
 *
 * 带图标
 * ```tsx
 * <Input icon="search" placeholder="搜索" />
 * ```
 *
 * 带前后缀
 * ```tsx
 * <Input prefix="https://" suffix=".com" placeholder="网址" />
 * ```
 *
 * 密码输入框
 * ```tsx
 * <Input type="password" icon="lock" placeholder="请输入密码" />
 * ```
 */
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

Input.displayName = 'Input';

export default Input;
