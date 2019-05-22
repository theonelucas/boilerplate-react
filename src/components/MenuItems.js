import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Another section</ListSubheader>
    <ListItem button>
      <ListItemIcon><FolderIcon /></ListItemIcon>
      <ListItemText primary="Page" />
    </ListItem>
  </div>
);
