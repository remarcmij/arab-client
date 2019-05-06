import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import Settings from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsDialog from './SettingsDialog';
import * as S from './strings';

const styles = () =>
  createStyles({
    list: {
      width: 250,
    },
  });

interface OwnProps {
  open: boolean;
  toggleDrawer: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const MainDrawer: React.FC<Props> = props => {
  const { classes, open, toggleDrawer } = props;
  const [settingsOpen, setSettingsOpen] = useState(false);

  const AboutLink = (p: {}) => <Link to="/about" {...p} />;

  const sideList = (
    <div className={classes.list}>
      <List>
        <ListItem button={true} onClick={() => setSettingsOpen(true)}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary={S.EDIT_SETTINGS} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component={AboutLink}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={S.ABOUT_MENU_ITEM} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <Drawer open={open} onClose={toggleDrawer}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          {sideList}
        </div>
      </Drawer>
      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(MainDrawer);
