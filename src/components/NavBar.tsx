import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import Settings from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import SettingsDialog from './SettingsDialog';
import GridContainer from './GridContainer';
import MainDrawer from './MainDrawer';
import * as S from './strings';

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  leftButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

interface OwnProps {
  title: string;
  enableSettingsMenu?: boolean;
  rightHandButtons: React.ReactElement<any> | null;
  onBack?: () => void;
  onLeftMenu?: () => void;
  onRightMenu?: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const NavBar: React.FC<Props> & { defaultProps: Partial<Props> } = props => {
  const {
    title,
    onBack,
    enableSettingsMenu,
    rightHandButtons,
    classes,
  } = props;

  const [mainDrawerOpen, setMainDrawerOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setSettingsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSettingsDialogOpen(false);
  };

  const handleToggleDrawer = () => {
    setMainDrawerOpen(!mainDrawerOpen);
  };

  return (
    <AppBar position="fixed">
      <GridContainer>
        <Toolbar>
          {onBack ? (
            <IconButton
              className={classes.leftButton}
              onClick={onBack}
              color="inherit"
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.leftButton}
              onClick={handleToggleDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
          </Typography>
          {rightHandButtons}
          {enableSettingsMenu && (
            <Tooltip title={S.EDIT_SETTINGS} aria-label={S.EDIT_SETTINGS}>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup={true}
                onClick={handleOpenDialog}
                color="inherit"
              >
                <Settings />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        {enableSettingsMenu && (
          <SettingsDialog
            open={settingsDialogOpen}
            onClose={handleCloseDialog}
          />
        )}
        {!onBack && (
          <MainDrawer open={mainDrawerOpen} toggleDrawer={handleToggleDrawer} />
        )}
      </GridContainer>
    </AppBar>
  );
};

NavBar.defaultProps = {
  enableSettingsMenu: false,
  rightHandButtons: null,
};

export default withStyles(styles)(NavBar);
