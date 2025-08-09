import classNames from 'classnames';

export const enum ButtonSize {
  Small = 'small',
  Large = 'large',
}
export const enum ButtonType {
  Primary = 'primary',
  Danger = 'danger',
  Link = 'link',
  Default = 'default',
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  btnType?: ButtonType;
  size?: ButtonSize;
  children?: React.ReactNode;
  href?: string;
}

const Button: React.FC<BaseButtonProps> = props => {
  const {
    btnType = ButtonType.Default,
    size,
    disabled = false,
    className,
    children,
    href,
  } = props;
  console.log(props);
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType !== ButtonType.Default,
    [`btn-${size}`]: size,
    ['disabled']: btnType === ButtonType.Link && disabled,
  });
  if (btnType === ButtonType.Link && href)
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    );
  }
};

export default Button;
