import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Menu 导航菜单',
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
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: '菜单类型',
    },
    defaultIndex: {
      control: 'text',
      description: '默认选中的菜单项索引',
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
  name: '默认菜单',
  render: renderCom,
};

export const HorizontalMenu: Story = {
  name: '水平菜单',
  args: {
    mode: 'horizontal',
  },
  render: renderCom,
};

export const VerticalMenu: Story = {
  name: '垂直菜单',
  args: {
    mode: 'vertical',
  },
  render: renderCom,
};

export const DefaultOpenMenu: Story = {
  name: '默认展开的垂直菜单',
  args: {
    mode: 'vertical',
    defaultOpenSubMenus: ['3'],
  },
  render: renderCom,
};

export const ComplexMenu: Story = {
  name: '复杂菜单',
  args: {
    mode: 'horizontal',
    defaultIndex: '1',
  },
  render: args => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <SubMenu title="课程">
        <MenuItem>React</MenuItem>
        <MenuItem>Vue</MenuItem>
        <SubMenu title="Angular">
          <MenuItem>基础</MenuItem>
          <MenuItem>进阶</MenuItem>
        </SubMenu>
      </SubMenu>
      <MenuItem>关于我们</MenuItem>
      <SubMenu title="更多">
        <MenuItem>联系</MenuItem>
        <MenuItem disabled>招聘</MenuItem>
        <MenuItem>新闻</MenuItem>
      </SubMenu>
    </Menu>
  ),
};
