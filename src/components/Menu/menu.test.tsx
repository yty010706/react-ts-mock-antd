import { fireEvent, render, waitFor } from '@testing-library/react';
import Menu, { MenuProps, ModeType } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const fn = jest.fn();
const generateMenu = (mode: ModeType) => {
  const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: fn,
  };
  return (
    <Menu data-testid="menu" {...testProps} mode={mode}>
      <MenuItem>主页</MenuItem>
      <MenuItem disabled>关注</MenuItem>
      <MenuItem>设置</MenuItem>
    </Menu>
  );
};

describe('Test Menu', () => {
  it('基础Menu渲染测试、disable/active状态测试', () => {
    const wrapper = render(generateMenu('horizontal'));
    const menu = wrapper.getByTestId('menu');
    expect(menu).toBeInTheDocument();

    expect(menu).toHaveClass('menu-horizontal');
    expect(menu.querySelectorAll('li').length).toBe(3);
    const items = menu.querySelectorAll('li');
    expect(items[0]).toHaveClass('active');
    expect(items[1]).toHaveClass('disabled');

    fireEvent.click(items[2]);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(items[0]).not.toHaveClass('active');
    expect(items[2]).toHaveClass('active');

    fireEvent.click(items[1]);
    expect(fn).not.toHaveBeenCalledTimes(2);
  });

  it('纵向Menu渲染测试', () => {
    const wrapper = render(generateMenu('vertical'));
    const menu = wrapper.getByTestId('menu');
    expect(menu).toBeInTheDocument();

    expect(menu).toHaveClass('menu-vertical');
  });

  it('横向SubMenu渲染测试', async () => {
    const testProps: MenuProps = {
      defaultIndex: '0',
      onSelect: fn,
    };
    const wrapper = render(
      <Menu data-testid="menu" {...testProps} mode="horizontal">
        <SubMenu title="下拉菜单">
          <MenuItem>主页</MenuItem>
          <MenuItem disabled>关注</MenuItem>
          <MenuItem>设置</MenuItem>
        </SubMenu>
      </Menu>
    );

    const menu = wrapper.getByTestId('menu');
    expect(menu).toBeInTheDocument();

    const subMenu = menu.querySelectorAll('li')[0];
    expect(subMenu).toHaveClass('sub-menu');
    // expect(subMenu.querySelector('.sub-menu-item')).not.toBeInTheDocument();

    fireEvent.mouseEnter(subMenu);
    await waitFor(
      () => {
        expect(subMenu.querySelector('.sub-menu-item')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    const subMenuCtr = subMenu.querySelector('.sub-menu-item');
    fireEvent.click(subMenuCtr!.querySelectorAll('li')[0]);
    expect(subMenu).toHaveClass('active');
    // expect(testProps.onSelect).toHaveBeenCalledTimes(2);
  });

  it('纵向SubMenu渲染测试', async () => {
    const wrapper = render(
      <Menu data-testid="menu" mode="vertical" defaultIndex="0">
        <MenuItem>主页</MenuItem>
        <SubMenu title="下拉菜单">
          <MenuItem>主页</MenuItem>
          <MenuItem disabled>关注</MenuItem>
          <MenuItem>设置</MenuItem>
        </SubMenu>
      </Menu>
    );

    const menu = wrapper.getByTestId('menu');
    expect(menu).toBeInTheDocument();

    const subMenu = menu.querySelectorAll('li')[1];
    expect(subMenu).toHaveClass('sub-menu');
    expect(subMenu.querySelector('.sub-menu-item')).not.toBeInTheDocument();

    fireEvent.click(subMenu.childNodes[0]);
    await waitFor(() => {
      expect(subMenu.querySelector('.sub-menu-item')).toBeInTheDocument();
    });
    const subMenuCtr = subMenu.querySelector('.sub-menu-item');
    fireEvent.click(subMenuCtr!.querySelectorAll('li')[0]);
    expect(subMenu).toHaveClass('active');
  });
});
