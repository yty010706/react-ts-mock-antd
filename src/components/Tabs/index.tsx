import Tabs, { TabProps } from './tabs';
import TabItem, { TabItemProps } from './tabItem';

interface ITabsComponent extends React.FC<TabProps> {
  Item: React.FC<TabItemProps>;
}
const TransTabs = Tabs as ITabsComponent;
TransTabs.Item = TabItem;

export default TransTabs;
