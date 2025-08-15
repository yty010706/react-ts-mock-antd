import classNames from 'classnames';
import { useContext } from 'react';
import { MenuContext } from './menu';

export type MenuItemProps = {
  index?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
};
export const MenuItem = ({
  index,
  children,
  disabled,
  className,
}: MenuItemProps) => {
  const { selectIdx, onSelect } = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    disabled: disabled,
    active: index === selectIdx && !disabled,
  });

  const handleClick = () => {
    if (onSelect && !disabled) {
      onSelect(index!);
    }
  };
  return (
    <>
      <li key={index} className={classes} onClick={handleClick}>
        {children}
      </li>
    </>
  );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
