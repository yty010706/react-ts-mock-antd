import { ChangeEvent, useMemo } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon';

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLElement>,
    'size' | 'prefix' | 'suffix'
  > {
  size?: 'sm' | 'lg';
  disabled?: boolean;
  icon?: IconProp;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
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
}) => {
  console.log(icon);
  const classes = useMemo(() => {
    return classNames('input', className, {
      disabled: disabled,
      [`input-${size}`]: size,
      'input-icon': icon,
      [`input-icon-${size}`]: size && icon,
    });
  }, [className, disabled]);

  return (
    <div className="input-wrapper">
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
