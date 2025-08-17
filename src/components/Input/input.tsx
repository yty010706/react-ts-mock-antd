import { ChangeEvent, useMemo } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon';

interface InputProps
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

/**
 * 页面上常见的按钮元素，用于完成特定的交互。支持HTML Button和a链接形式，具备多种类型和尺寸
 * ## 引入方式
 * ```tsx
 * import {Button} from 'mockAntD'
 * <Button btnType='primary' size='large'>Button</Button>
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
  }, [size, icon, disabled, className]);

  return (
    <div className="input-wrapper">
      {prefix && <div className="input-prefix-wrapper">{prefix}</div>}
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
    </div>
  );
};

export default Input;
