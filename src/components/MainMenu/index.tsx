import { FC, useState } from "react";

import { Menu, MenuButton, MenuItem, SubMenu } from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import {styles} from './styles' 

interface IMainMenuProps {
  style: any
  children: any
}

export const MainMenu: FC<IMainMenuProps> = ({style, children}) => {

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        {children}
      </div>
      <div style={{...styles.menuContainer, ...style}}>
        <Menu
          menuStyle={{...style}}
          menuButton={<MenuButton style={styles.menuButton}>File</MenuButton>}>
          <MenuItem style={styles.menuItem}>Open</MenuItem>
        </Menu>

        <Menu
          menuStyle={{...style}}
          menuButton={<MenuButton style={styles.menuButton}>Window</MenuButton>}>
          <MenuItem style={styles.menuItem}>GRBL Settings</MenuItem>
        </Menu>

        <Menu
          menuStyle={{...style}}
          menuButton={<MenuButton style={styles.menuButton}>Help</MenuButton>}>
          <MenuItem style={styles.menuItem}>About</MenuItem>
        </Menu>

        {/* <Menu
          menuStyle={{...styles.menu, ...style}}
          menuButton={<MenuButton style={styles.menuButton}>File</MenuButton>}>
          <MenuItem style={styles.menuItem} >New File</MenuItem>
          <SubMenu menuStyle={{ ...styles.menu, ...style }} label="Edit">
            <MenuItem style={styles.menuItem}><button>Cut</button></MenuItem>
            <MenuItem style={styles.menuItem}>Copy</MenuItem>
            <MenuItem style={styles.menuItem}>Paste</MenuItem>
            <SubMenu menuStyle={{ ...styles.menu, ...style }} label="Find">
              <MenuItem style={styles.menuItem}>Find...</MenuItem>
              <MenuItem style={styles.menuItem}>Find Next</MenuItem>
              <MenuItem style={styles.menuItem}>Find Previous</MenuItem>
            </SubMenu>
          </SubMenu>
          <MenuItem style={styles.menuItem}>Print...</MenuItem>
        </Menu> */}
      </div>
    </div>
  )
};