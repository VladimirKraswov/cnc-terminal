import { Menu, MenuButton, MenuItem, SubMenu } from "@szhsin/react-menu";


export const MainMenu = () => (
<Menu menuButton={<MenuButton>Menu</MenuButton>}>
  <MenuItem>New File</MenuItem>
  <SubMenu label="Edit">
    <MenuItem>Cut</MenuItem>
    <MenuItem>Copy</MenuItem>
    <MenuItem>Paste</MenuItem>
    <SubMenu label="Find">
      <MenuItem>Find...</MenuItem>
      <MenuItem>Find Next</MenuItem>
      <MenuItem>Find Previous</MenuItem>
    </SubMenu>
  </SubMenu>
  <MenuItem>Print...</MenuItem>
</Menu>
);