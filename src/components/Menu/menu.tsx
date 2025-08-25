import classNames from 'classnames';
import React, {
  useMemo,
  useState,
  ReactElement,
  FunctionComponent,
  cloneElement,
} from 'react';
import { MenuItemProps } from './menuItem';
import { MenuContext } from '@/Contexts/MenuContext';

export type ModeType = 'horizontal' | 'vertical';
export type SelectCb = (selectIdx: string) => void;

/** Menu 菜单属性 */
export interface MenuProps {
  /** 默认激活菜单项索引 */
  defaultIndex: string;
  /** 菜单类型 */
  mode?: ModeType;
  /** 默认展开的SubMenu索引数组 */
  defaultOpenSubMenus?: string[];
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
  /** 菜单项被选中时的回调函数 */
  onSelect?: SelectCb;
}

/**
 * 为网站提供导航功能的菜单组件。
 *
 * ### 何时使用
 *
 * 导航菜单是一个网站的灵魂，用户依赖导航在各个页面之间跳转。
 * 一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，
 * 侧边导航提供多级结构来收纳和排列网站的架构。
 *
 * ### 示例
 *
 * 水平菜单
 * ```tsx
 * <Menu defaultIndex="0" mode="horizontal" onSelect={(index) => console.log(index)}>
 *   <Menu.Item>首页</Menu.Item>
 *   <Menu.Item>关于</Menu.Item>
 *   <Menu.SubMenu title="更多">
 *     <Menu.Item>联系</Menu.Item>
 *     <Menu.Item>招聘</Menu.Item>
 *   </Menu.SubMenu>
 * </Menu>
 * ```
 *
 * 垂直菜单
 * ```tsx
 * <Menu defaultIndex="0" mode="vertical" onSelect={(index) => console.log(index)}>
 *   <Menu.Item>首页</Menu.Item>
 *   <Menu.Item>关于</Menu.Item>
 *   <Menu.SubMenu title="更多">
 *     <Menu.Item>联系</Menu.Item>
 *     <Menu.Item>招聘</Menu.Item>
 *   </Menu.SubMenu>
 * </Menu>
 * ```
 *
 * 默认展开的垂直菜单
 * ```tsx
 * <Menu
 *   defaultIndex="0"
 *   mode="vertical"
 *   defaultOpenSubMenus={['2']}
 *   onSelect={(index) => console.log(index)}
 * >
 *   <Menu.Item>首页</Menu.Item>
 *   <Menu.Item>关于</Menu.Item>
 *   <Menu.SubMenu title="更多">
 *     <Menu.Item>联系</Menu.Item>
 *     <Menu.Item>招聘</Menu.Item>
 *   </Menu.SubMenu>
 * </Menu>
 * ```
 */
export const Menu = ({
  defaultIndex,
  mode = 'horizontal',
  onSelect,
  className,
  style,
  children,
  defaultOpenSubMenus = [],
  ...props
}: MenuProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const classes = useMemo(() => {
    return classNames('menu', className, {
      [`menu-${mode}`]: mode,
    });
  }, [mode]);
  const passedContext = useMemo(() => {
    return {
      selectIdx: activeIndex,
      onSelect: (selectIdx: string) => {
        setActiveIndex(selectIdx);
        onSelect?.(selectIdx);
      },
      mode,
      defaultOpenSubMenus,
    };
  }, [activeIndex, onSelect]);

  const renderChildren = () => {
    return React.Children.map(children, (child, idx) => {
      const childElement = child as ReactElement<
        MenuItemProps,
        FunctionComponent<MenuItemProps>
      >;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return cloneElement(childElement, { index: idx.toString() });
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        );
      }
    });
  };

  return (
    <>
      <ul className={classes} style={style} {...props}>
        <MenuContext value={passedContext}>{renderChildren()}</MenuContext>
      </ul>
    </>
  );
};

export default Menu;
