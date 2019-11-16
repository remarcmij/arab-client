import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Types from 'Types';

const useStyles = makeStyles({
  pinkAvatar: {
    color: '#fff',
    backgroundColor: pink[500],
  },
  greenAvatar: {
    color: '#fff',
    backgroundColor: green[500],
  },
});

type Props = Readonly<{
  publication: Types.ITopic;
}>;

const ArticleListItem: React.FC<Props> = props => {
  const classes = useStyles();
  const { filename, title, subtitle } = props.publication;
  const [publication, article] = filename.split('.');

  return (
    <ListItem
      component={Link}
      to={`/content/${publication}/${article}`}
      button={true}
    >
      <ListItemAvatar>
        <Avatar classes={{ colorDefault: classes.greenAvatar }}>
          {title[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <span dangerouslySetInnerHTML={{ __html: subtitle || '' }} />
        }
      />
    </ListItem>
  );
};

export default ArticleListItem;
