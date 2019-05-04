import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Code from '@material-ui/icons/Code';
import Notes from '@material-ui/icons/Notes';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Types from 'Types';

const styles = () =>
  createStyles({
    pinkAvatar: {
      color: '#fff',
      backgroundColor: pink[500],
    },
    greenAvatar: {
      color: '#fff',
      backgroundColor: green[500],
    },
  });

interface OwnProps {
  readonly publication: Types.AppDocument;
}

type Props = OwnProps & WithStyles<typeof styles>;

const ArticleListItem: React.FC<Props> = props => {
  const { classes } = props;
  const { filename, title, subtitle, kind } = props.publication;
  const [publication, article] = filename.split('.');

  const ItemLink = (p: {}) => (
    <Link to={`/content/${publication}/${article}`} {...p} />
  );

  return (
    <ListItem component={ItemLink} button={true}>
      {kind === 'lemmas' ? (
        <ListItemAvatar className={classes.pinkAvatar}>
          <Avatar>
            <Code />
          </Avatar>
        </ListItemAvatar>
      ) : (
        <ListItemAvatar className={classes.greenAvatar}>
          <Avatar>
            <Notes color="inherit" />
          </Avatar>
        </ListItemAvatar>
      )}
      <ListItemText
        primary={title}
        secondary={
          <span dangerouslySetInnerHTML={{ __html: subtitle || '' }} />
        }
      />
    </ListItem>
  );
};

export default withStyles(styles)(ArticleListItem);
