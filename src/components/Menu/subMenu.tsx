import React, {
  cloneElement,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { MenuContext } from './menu';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

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

  useEffect(() => {
    if (open && !selectIdx.startsWith(index!)) {
      setOpen(false);
    } else if (!open && selectIdx.startsWith(index!)) {
      setOpen(true);
    }
  }, [selectIdx]);

  const classes = classNames('menu-item', 'sub-menu', className, {
    active: selectIdx.startsWith(index!),
  });

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
    const classes = classNames('sub-menu-item', {
      'sub-menu-open': open,
    });

    return <ul className={classes}>{childElement}</ul>;
  };

  let timer: any = null;
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(!open);
  };
  const handleHover = (e: MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 100);
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
        </div>
        {open && renderChildren()}
      </li>
    </>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
