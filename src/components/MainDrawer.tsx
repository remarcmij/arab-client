import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React from 'react';
import * as S from './strings';
import { Link } from 'react-router-dom';

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

  const AboutLink = (p: {}) => <Link to="/about" {...p} />;

  const sideList = (
    <div className={classes.list}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button={true} key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <InfoIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
    <Drawer open={open} onClose={toggleDrawer}>
      <div tabIndex={0} role="button" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
        {sideList}
      </div>
    </Drawer>
  );
};

export default withStyles(styles)(MainDrawer);
