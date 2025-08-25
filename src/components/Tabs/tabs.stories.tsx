import Tabs from './tabs';
import TabItem from './tabItem';
import { fn } from 'storybook/test';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Tabs 标签页',
  component: Tabs,
  tags: ['autodocs'],
  args: { onSelect: fn() },
  argTypes: {
    defaultIndex: {
      control: { type: 'number' },
      description: '默认激活的标签页索引',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认标签页',
  render: args => (
    <Tabs {...args}>
      <TabItem label="首页">这是首页内容</TabItem>
      <TabItem label="详情">这是详情内容</TabItem>
      <TabItem label="设置">这是设置内容</TabItem>
    </Tabs>
  ),
  args: {
    defaultIndex: 0,
  },
};

export const DisabledTab: Story = {
  name: '包含禁用标签页',
  render: args => (
    <Tabs {...args}>
      <TabItem label="首页">这是首页内容</TabItem>
      <TabItem label="详情" disabled>
        这是详情内容
      </TabItem>
      <TabItem label="设置">这是设置内容</TabItem>
    </Tabs>
  ),
  args: {
    defaultIndex: 0,
  },
};

export const CustomContent: Story = {
  name: '自定义内容标签页',
  render: args => (
    <Tabs {...args}>
      <TabItem label="用户管理">
        <div>
          <h3>用户管理</h3>
          <p>在这里可以管理用户信息</p>
        </div>
      </TabItem>
      <TabItem label="权限管理">
        <div>
          <h3>权限管理</h3>
          <p>在这里可以设置用户权限</p>
        </div>
      </TabItem>
      <TabItem label="系统设置">
        <div>
          <h3>系统设置</h3>
          <p>在这里可以配置系统参数</p>
        </div>
      </TabItem>
    </Tabs>
  ),
  args: {
    defaultIndex: 0,
  },
};

export const WithEvent: Story = {
  name: '带事件回调',
  render: args => (
    <Tabs {...args}>
      <TabItem label="Tab 1">内容 1</TabItem>
      <TabItem label="Tab 2">内容 2</TabItem>
      <TabItem label="Tab 3">内容 3</TabItem>
    </Tabs>
  ),
  args: {
    defaultIndex: 0,
    onSelect: fn(),
  },
};
