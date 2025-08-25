import React, {
  cloneElement,
  FunctionComponent,
  MouseEvent,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon';
import Transition from '../Transition';
import { MenuContext } from '@/Contexts/MenuContext';

/** SubMenu 子菜单属性 */
export interface SubMenuProps {
  /** 子菜单索引 */
  index?: string;
  /** 子菜单标题 */
  title?: string;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * 子菜单组件，用于创建多级菜单结构。
 *
 * ### 示例
 *
 * 基础子菜单
 * ```tsx
 * <Menu.SubMenu title="更多选项">
 *   <Menu.Item>选项1</Menu.Item>
 *   <Menu.Item>选项2</Menu.Item>
 * </Menu.SubMenu>
 * ```
 *
 * 嵌套子菜单
 * ```tsx
 * <Menu.SubMenu title="更多选项">
 *   <Menu.Item>选项1</Menu.Item>
 *   <Menu.SubMenu title="子选项">
 *     <Menu.Item>子选项1</Menu.Item>
 *     <Menu.Item>子选项2</Menu.Item>
 *   </Menu.SubMenu>
 * </Menu.SubMenu>
 * ```
 */
export const SubMenu = ({
  index,
  title,
  className,
  children,
}: SubMenuProps) => {
  const { selectIdx, mode, defaultOpenSubMenus } = useContext(MenuContext);
  const [open, setOpen] = useState(false);
  const subRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setOpen(mode === 'vertical' && defaultOpenSubMenus!.includes(index!));
  }, [defaultOpenSubMenus]);

  useEffect(() => {
    if (open && !selectIdx.startsWith(index!)) {
      setOpen(false);
    } else if (!open && selectIdx.startsWith(index!)) {
      setOpen(true);
    }
  }, [selectIdx]);

  const classes = useMemo(() => {
    return classNames('menu-item', 'sub-menu', className, {
      active: selectIdx.startsWith(index!),
      'sub-menu-open': open,
    });
  }, [selectIdx, open]);

  const renderChildren = () => {
    const childElement = React.Children.map(children, (child, idx) => {
      const childElement = child as ReactElement<
        MenuItemProps,
        FunctionComponent<MenuItemProps>
      >;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return cloneElement(childElement, { index: `${index}-${idx}` });
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        );
      }
    });
    return (
      <Transition
        in={open}
        timeout={300}
        animation="zoom-in-top"
        nodeRef={subRef}
        unmountOnExit
      >
        <ul className="sub-menu-item" ref={subRef}>
          {childElement}
        </ul>
      </Transition>
    );
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(!open);
  };
  const handleHover = (e: MouseEvent, toggle: boolean) => {
    e.preventDefault();
    setOpen(toggle);
  };
  const clickEvents =
    mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    mode === 'horizontal'
      ? {
          onMouseEnter: (e: MouseEvent) => handleHover(e, true),
          onMouseLeave: (e: MouseEvent) => handleHover(e, false),
        }
      : {};

  return (
    <>
      <li key={index} className={classes} {...hoverEvents}>
        <div className="sub-menu-title" {...clickEvents}>
          {title}
          <Icon icon="angle-down" className="arrow-icon" size="sm" />
        </div>
        {renderChildren()}
      </li>
    </>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
