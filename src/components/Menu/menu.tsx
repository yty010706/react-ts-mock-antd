import classNames from 'classnames';
import React, {
  useMemo,
  createContext,
  useState,
  ReactElement,
  FunctionComponent,
  cloneElement,
} from 'react';
import { MenuItemProps } from './menuItem';

export type ModeType = 'horizontal' | 'vertical';
type SelectCb = (selectIdx: string) => void;
export interface MenuProps {
  defaultIndex: string;
  mode?: ModeType;
  defaultOpenSubMenus?: string[];
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onSelect?: SelectCb;
}
export interface MenuContextProps {
  selectIdx: string;
  onSelect?: SelectCb;
  mode?: ModeType;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<MenuContextProps>({ selectIdx: '0' });
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
        onSelect && onSelect(selectIdx);
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
