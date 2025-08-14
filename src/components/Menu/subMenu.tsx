import React, {
  cloneElement,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MenuContext } from './menu';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon';
import Transition from '../Transition';

interface BaseSubMenuProps {
  index: string;
  title: string;
  className: string;
}
export type SubMenuProps = Partial<
  BaseSubMenuProps & HTMLAttributes<HTMLLIElement>
>;

const SubMenu: React.FC<SubMenuProps> = props => {
  const { index, title, className, children } = props;
  const { selectIdx, mode, defaultOpenSubMenus } = useContext(MenuContext);
  const [open, setOpen] = useState(
    mode === 'vertical' ? defaultOpenSubMenus!.includes(index!) : false
  );
  const subRef = useRef<HTMLUListElement>(null);

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
  }, [open]);

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
