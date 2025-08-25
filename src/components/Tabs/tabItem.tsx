import { TabsContext } from '@/Contexts/TabsContext';
import classNames from 'classnames';
import { MouseEvent, ReactNode, useContext, useEffect } from 'react';

/** TabItem 标签页项属性 */
export interface TabItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** 标签页索引 */
  index?: number;
  /** 标签页标题 */
  label: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}
/**
 * 标签页项组件，用于Tabs组件的子项。
 *
 * ### 示例
 *
 * 基础标签项
 * ```tsx
 * <Tabs.Item label="Tab 1">内容1</Tabs.Item>
 * ```
 *
 * 禁用标签项
 * ```tsx
 * <Tabs.Item label="Tab 2" disabled>内容2</Tabs.Item>
 * ```
 *
 * 自定义标签
 * ```tsx
 * <Tabs.Item label={<span><Icon icon="user" /> 用户</span>}>用户内容</Tabs.Item>
 * ```
 */
const TabItem = ({
  index,
  label,
  disabled,
  children,
  className,
}: TabItemProps) => {
  const { selectIndex, onSelect, setContent } = useContext(TabsContext);

  const classes = classNames('tabs-item', className, {
    disabled,
    active: selectIndex === index,
  });

  useEffect(() => {
    if (selectIndex === index) {
      setContent!(children);
    }
  }, [selectIndex]);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!disabled && onSelect) {
      onSelect(index!);
    }
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
