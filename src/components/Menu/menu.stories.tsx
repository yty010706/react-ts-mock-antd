import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
const meta = {
  title: 'Menu',
  component: Menu,
  tags: ['autodocs'],
  args: {
    onSelect: fn(),
    defaultIndex: '0',
  },
  subcomponents: { MenuItem: MenuItem, SubMenu: SubMenu },
  parameters: {
    backgrounds: {
      options: [
        { name: 'white', value: '#fff', default: true },
        { name: 'black', value: '#000' },
      ],
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;
const renderCom = (args: any) => (
  <Menu {...args}>
    <MenuItem>主页</MenuItem>
    <MenuItem disabled>关注</MenuItem>
    <MenuItem>设置</MenuItem>
    <SubMenu title="下拉菜单">
      <MenuItem>主页</MenuItem>
      <MenuItem disabled>关注</MenuItem>
      <MenuItem>设置</MenuItem>
    </SubMenu>
  </Menu>
);
export const Default: Story = {
  render: renderCom,
};

export const HorizontalMenu: Story = {
  args: {
    mode: 'horizontal',
  },
  render: renderCom,
};

export const VerticalMenu: Story = {
  args: {
    mode: 'vertical',
  },
  render: renderCom,
};

export const DefaultOpenMenu: Story = {
  args: {
    mode: 'vertical',
    defaultOpenSubMenus: ['3'],
  },
  render: renderCom,
};
