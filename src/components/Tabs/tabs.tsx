import classNames from 'classnames';
import React, {
  cloneElement,
  FunctionComponent,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import { TabItemProps } from './tabItem';
import { TabContextProps, TabsContext } from '@/Contexts/TabsContext';

/** Tabs 标签页属性 */
export interface TabProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** 默认激活的标签页索引 */
  defaultIndex?: number;
  /** 标签页切换时的回调函数 */
  onSelect?: (index: number) => void;
}

/**
 * 选项卡切换组件，用于在不同的内容面板之间进行切换。
 *
 * ### 何时使用
 *
 * - 对复杂区域进行分组展示，保持界面整洁
 * - 同级别内容之间的并列展示
 *
 * ### 示例
 *
 * 基础用法
 * ```tsx
 * <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
 *   <Tabs.Item label="Tab 1">内容1</Tabs.Item>
 *   <Tabs.Item label="Tab 2">内容2</Tabs.Item>
 *   <Tabs.Item label="Tab 3">内容3</Tabs.Item>
 * </Tabs>
 * ```
 *
 * 禁用某一项
 * ```tsx
 * <Tabs defaultIndex={0}>
 *   <Tabs.Item label="Tab 1">内容1</Tabs.Item>
 *   <Tabs.Item label="Tab 2" disabled>内容2</Tabs.Item>
 *   <Tabs.Item label="Tab 3">内容3</Tabs.Item>
 * </Tabs>
 * ```
 */
const Tabs = ({
  defaultIndex = 0,
  onSelect,
  className,
  children,
  ...restProps
}: TabProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [content, setContent] = useState(null);

  const passedContext: TabContextProps = useMemo(() => {
    return {
      selectIndex: activeIndex,
      onSelect: (index: number) => {
        setActiveIndex(index);
        if (onSelect) {
          onSelect(index);
        }
      },
      setContent: (content: any) => {
        setContent(content);
      },
    };
  }, [activeIndex, onSelect]);

  const classes = classNames('tabs', className);

  const renderChildren = () => {
    return React.Children.map(children, (child, idx) => {
      const childElement = child as ReactElement<
        TabItemProps,
        FunctionComponent<TabItemProps>
      >;
      if (childElement.type.displayName === 'TabItem') {
        return cloneElement(childElement, { index: idx });
      } else {
        console.error(
          'Warning: Tabs has a child which is not a TabItem component'
        );
      }
    });
  };

  return (
    <div className={classes} {...restProps} data-testid="tabs">
      <div className="tabs-items">
        <TabsContext value={passedContext}> {renderChildren()}</TabsContext>
      </div>
      <div className="tabs-content">{content}</div>
    </div>
  );
};

export default Tabs;
