import { fireEvent, render } from '@testing-library/react';
import Tabs from '@/components/Tabs';
import { TabProps } from '@/components/Tabs/tabs';

const TabItem = Tabs.Item;

const generateTabs = (props: TabProps) => {
  return (
    <Tabs {...props}>
      <TabItem label="首页">主页</TabItem>
      <TabItem label="关注" disabled>
        关注
      </TabItem>
      <TabItem label="设置">设置</TabItem>
    </Tabs>
  );
};
describe('Test Tabs', () => {
  it('基础Tabs渲染测试', () => {
    const wrapper = render(generateTabs({ defaultIndex: 0 }));
    const tabs = wrapper.getByTestId('tabs');
    expect(tabs).toBeInTheDocument();

    const tabsItems = tabs.querySelectorAll('.tabs-item');
    expect(tabsItems).toHaveLength(3);
    expect(tabsItems[0]).toHaveClass('active');
    expect(tabsItems[1]).toHaveClass('disabled');

    const tabsContent = tabs.querySelector('.tabs-content');
    expect(tabsContent).toBeInTheDocument();
    expect(tabsContent?.textContent).toEqual('主页');
  });

  it('点击Item切换测试', () => {
    const wrapper = render(generateTabs({ defaultIndex: 0 }));
    const tabs = wrapper.getByTestId('tabs');
    expect(tabs).toBeInTheDocument();

    const tabsItems = tabs.querySelectorAll('.tabs-item');
    fireEvent.click(tabsItems[2]);
    expect(tabsItems[0]).not.toHaveClass('active');
    expect(tabsItems[2]).toHaveClass('active');

    const tabsContent = tabs.querySelector('.tabs-content');
    expect(tabsContent).toBeInTheDocument();
    expect(tabsContent?.textContent).toEqual('设置');
  });

  it('onSelect测试', () => {
    const props = { defaultIndex: 0, onSelect: jest.fn() };
    const wrapper = render(generateTabs(props));
    const tabs = wrapper.getByTestId('tabs');
    expect(tabs).toBeInTheDocument();

    const tabsItems = tabs.querySelectorAll('.tabs-item');
    fireEvent.click(tabsItems[2]);
    expect(props.onSelect).toHaveBeenCalledTimes(1);
  });
});
