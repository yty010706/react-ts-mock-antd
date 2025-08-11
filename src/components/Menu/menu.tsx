import classNames from 'classnames';
import { useMemo, createContext, useState } from 'react';

type ModeType = 'horizontal' | 'vertical';
type SelectCb = (selectIdx: number) => void;
type BaseMenuProps = {
  defaultIndex: number;
  mode?: ModeType;
  onSelect?: SelectCb;
};
export type MenuProps = BaseMenuProps & React.HTMLAttributes<HTMLUListElement>;
export interface MenuContextProps {
  selectIdx: number;
  onSelect?: SelectCb;
}

export const MenuContext = createContext<MenuContextProps>({ selectIdx: 0 });
const Menu: React.FC<MenuProps> = props => {
  const { defaultIndex, mode, onSelect, className, style, children } = props;
  const classes = useMemo(() => {
    return classNames('menu', className, {
      [`menu-${mode}`]: mode,
    });
  }, [mode]);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const passedContext = useMemo(() => {
    return {
      selectIdx: activeIndex,
      onSelect: (selectIdx: number) => {
        setActiveIndex(selectIdx);
        onSelect && onSelect(selectIdx);
      },
    };
  }, [activeIndex, onSelect]);

  return (
    <>
      <ul className={classes} style={style}>
        <MenuContext value={passedContext}>{children}</MenuContext>
      </ul>
    </>
  );
};

export default Menu;
