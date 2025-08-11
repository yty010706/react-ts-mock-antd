import classNames from 'classnames';
import { useContext } from 'react';
import { MenuContext } from './menu';

type BaseMenuItemProps = {
  index: number;
  disabled?: boolean;
};
export type MenuItemProps = BaseMenuItemProps &
  React.HTMLAttributes<HTMLLIElement>;
const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, children, disabled, className } = props;
  const { selectIdx, onSelect } = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    disabled: disabled,
    active: index === selectIdx && !disabled,
  });

  const handleClick = () => {
    if (onSelect && !disabled) {
      onSelect(index);
    }
  };
  return (
    <>
      <li className={classes} onClick={handleClick}>
        {children}
      </li>
    </>
  );
};

export default MenuItem;
