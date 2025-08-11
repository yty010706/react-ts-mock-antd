import Menu from '@/components/Menu';
import MenuItem from '@/components/Menu/menuItem';

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
        <Menu defaultIndex={1} onSelect={index => console.log(index)}>
          <MenuItem index={1}>1</MenuItem>
          <MenuItem index={2} disabled>
            2
          </MenuItem>
          <MenuItem index={3}>3</MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default TestMenu;
