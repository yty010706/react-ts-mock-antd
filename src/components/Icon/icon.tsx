import { FC } from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

type Theme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';
interface IconProps extends FontAwesomeIconProps {
  theme?: Theme;
}

const Icon: FC<IconProps> = props => {
  const { theme, icon, className, ...restProps } = props;

  const classes = classNames(className, {
    [`icon-${theme}`]: theme,
  });

  return (
    <>
      <FontAwesomeIcon icon={icon} className={classes} {...restProps} />
    </>
  );
};

export default Icon;
