import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import UniversalComponent from '../UniversalComponent';
import { mainListItems, secondaryListItems } from './MenuItems';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  appBarSpacer: theme.mixins.toolbar,
  chartContainer: {
    marginLeft: -22,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: 0,
  },
  drawerPaper: {
    position: 'relative',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  menuButton: {
    color: '#212121',
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  root: {
    display: 'flex',
  },
  tableContainer: {
    height: 320,
  },
  title: {
    color: '#212121',
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: '#fff',
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    ...theme.mixins.toolbar,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
});

class Switcher extends React.PureComponent {
  state = {
    open: true,
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
    const { props, state } = this;

    return (
      <div className={props.classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={`${props.classes.appBar} ${state.open ? props.classes.appBarShift : ''}`}
        >
          <Toolbar disableGutters={!state.open} className={props.classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={`${props.classes.menuButton} ${state.open ? props.classes.menuButtonHidden : ''}`}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              noWrap
              className={props.classes.title}
            >
              App
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{ paper: `${props.classes.drawerPaper} ${!state.open ? props.classes.drawerPaperClose : ''}` }}
          open={state.open}
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
        <main className={props.classes.content}>
          <div className={props.classes.appBarSpacer} />
          <UniversalComponent page={props.page} isLoading={props.isLoading} />
        </main>
      </div>
    );
  }
}

Switcher.propTypes = {
  classes: PropTypes.shape({
    appBar: PropTypes.string.isRequired,
    appBarShift: PropTypes.string.isRequired,
    drawerPaper: PropTypes.string.isRequired,
    drawerPaperClose: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
    menuButtonHidden: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
    toolbarIcon: PropTypes.string.isRequired,
  }).isRequired,
};

const mapState = ({ page }) => ({
  isLoading: false,
  page,
});

export default connect(mapState)(withStyles(styles)(Switcher));
