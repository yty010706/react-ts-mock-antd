import { MenuContext } from '@/Contexts/MenuContext';
import classNames from 'classnames';
import { useContext } from 'react';

/** MenuItem 菜单项属性 */
export interface MenuItemProps {
  /** 菜单项索引 */
  index?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

/**
 * 菜单项组件，用于Menu组件的子项。
 *
 * ### 示例
 *
 * 基础菜单项
 * ```tsx
 * <Menu.Item>首页</Menu.Item>
 * ```
 *
 * 禁用菜单项
 * ```tsx
 * <Menu.Item disabled>禁用项</Menu.Item>
 * ```
 */
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
