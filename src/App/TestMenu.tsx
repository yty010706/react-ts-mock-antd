import Menu from '@/components/Menu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function TestMenu() {
  return (
    <>
      <Menu
        defaultIndex={'0'}
        onSelect={index => console.log(index)}
        mode="horizontal"
      >
        <MenuItem>主页</MenuItem>
        <MenuItem disabled>关注</MenuItem>
        <MenuItem>设置</MenuItem>
        <SubMenu title="下拉菜单">
          <MenuItem>主页</MenuItem>
          <MenuItem disabled>关注</MenuItem>
          <MenuItem>设置</MenuItem>
        </SubMenu>
      </Menu>
      <Menu
        defaultIndex={'0'}
        defaultOpenSubMenus={['3']}
        onSelect={index => console.log(index)}
        mode="vertical"
      >
        <MenuItem>主页</MenuItem>
        <MenuItem disabled>关注</MenuItem>
        <MenuItem>设置</MenuItem>
        <SubMenu title="下拉菜单">
          <MenuItem>主页</MenuItem>
          <MenuItem disabled>关注</MenuItem>
          <MenuItem>设置</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
}

export default TestMenu;
