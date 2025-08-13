import classNames from 'classnames';
import { MouseEvent, ReactNode, useContext, useEffect } from 'react';
import { TabsContext } from './tabs';

interface BaseTabItemProps {
  index?: number;
  label: ReactNode;
  disabled?: boolean;
}

export type TabItemProps = BaseTabItemProps &
  React.HTMLAttributes<HTMLLIElement>;

const TabItem: React.FC<TabItemProps> = props => {
  const { index, label, disabled, children, className } = props;
  const { selectIndex, onSelect, setContent } = useContext(TabsContext);

  const classes = classNames('tabs-item', className, {
    disabled,
    active: selectIndex === index,
  });

  useEffect(() => {
    selectIndex === index && setContent!(children);
  }, [selectIndex]);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    !disabled && onSelect && onSelect(index!);
  };

  return (
    <>
      <li className={classes} onClick={e => handleClick(e)}>
        {label}
      </li>
    </>
  );
};

TabItem.displayName = 'TabItem';
export default TabItem;
