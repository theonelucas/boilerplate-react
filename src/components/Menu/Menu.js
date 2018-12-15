import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { mainListItems, secondaryListItems } from './MenuItems';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Menu extends React.PureComponent {
  state = {
    open: true
  };

  handleDrawerOpen = () => {
    window.console.log('handleDrawerOpen');

    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    window.console.log('handleDrawerClose');

    this.setState({ open: false });
  };

  render() {
    const { props } = this;

    return (
      <div className={props.classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={`${props.classes.appBar} ${this.state.open ? props.classes.appBarShift : ''}`}
        >
          <Toolbar disableGutters={!this.state.open} className={props.classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={`${props.classes.menuButton} ${this.state.open ? props.classes.menuButtonHidden : ''}`}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={props.classes.title}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{ paper: `${props.classes.drawerPaper} ${!this.state.open ? props.classes.drawerPaperClose : ''}` }}
          open={this.state.open}
        >
          <div className={props.classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.shape({
    toolbarIcon: PropTypes.string.isRequired,
    drawerPaper: PropTypes.string.isRequired,
    drawerPaperClose: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    appBar: PropTypes.string.isRequired,
    appBarShift: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
    menuButtonHidden: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Menu);
