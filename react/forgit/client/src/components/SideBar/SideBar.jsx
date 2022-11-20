import React, { useState } from 'react';
import UIBox from '../UI/UIBox';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import TableRowsIcon from '@mui/icons-material/TableRows';

const SideBar = () => {
  const [isSupplyOpen, setIsSupplyOpen] = useState(false);

  const handleClick = () => {
    setIsSupplyOpen(!isSupplyOpen);
  };
  return (
    <UIBox bgColor={'#2d4968'} color={'#eee'} width={'180px'}>
      <List sx={{ width: '100%', maxWidth: 360 }} component='nav' aria-labelledby='nested-list-subheader'>
        <NavLink to='/' style={{ color: 'white', textDecoration: 'none' }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Главная'} />
          </ListItemButton>
        </NavLink>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary='МП' />
          {isSupplyOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isSupplyOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <NavLink to='/mpe1gem' style={{ color: 'white', textDecoration: 'none' }}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <TableRowsIcon />
                </ListItemIcon>
                <ListItemText primary={'Кровь'} />
              </ListItemButton>
            </NavLink>
          </List>
        </Collapse>
      </List>
    </UIBox>
  );
};

export default SideBar;
