import Menu from '@/components/Menu';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function TestMenu() {
  return (
    <>
      <div
        style={
          {
            // display: 'flex',
            // gap: 10,
            // marginTop: 10,
            // marginLeft: 10,
          }
        }
      >
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
          // defaultOpenSubMenus={['3']}
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
      </div>
    </>
  );
}

export default TestMenu;
