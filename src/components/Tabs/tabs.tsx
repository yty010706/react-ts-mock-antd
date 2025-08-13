import classNames from 'classnames';
import React, {
  cloneElement,
  createContext,
  FunctionComponent,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import { TabItemProps } from './tabItem';

interface BaseTabProps {
  defaultIndex?: number;
  onSelect?: (index: number) => void;
}
export type TabProps = BaseTabProps & React.HTMLAttributes<HTMLDivElement>;
interface TabContextProps {
  selectIndex: number;
  onSelect?: (index: number) => void;
  setContent?: (content: any) => void;
}

export const TabsContext = createContext<TabContextProps>({
  selectIndex: 0,
});
const Tabs: React.FC<TabProps> = props => {
  const {
    defaultIndex = 0,
    onSelect,
    className,
    children,
    ...restProps
  } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [content, setContent] = useState(null);

  const passedContext: TabContextProps = useMemo(() => {
    return {
      selectIndex: activeIndex,
      onSelect: (index: number) => {
        setActiveIndex(index);
        onSelect && onSelect(index);
      },
      setContent: (content: any) => {
        setContent(content);
      },
    };
  }, [activeIndex]);

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
