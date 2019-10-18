import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Types from 'Types';
import { LinkProps } from '@material-ui/core/Link';

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

type Props = {
  readonly publication: Types.Topic;
} & WithStyles<typeof styles>;

const ArticleListItem: React.FC<Props> = props => {
  const { classes } = props;
  const { filename, title, subtitle } = props.publication;
  const [publication, article] = filename.split('.');

  // const ItemLink = (p: any) => (
  //   <Link to={`/content/${publication}/${article}`} {...p} />
  // );
  const ItemLink = React.forwardRef<LinkProps, any>((p, ref) => (
    <Link ref={ref} to={`/content/${publication}/${article}`} {...p} />
  ));

  return (
    <ListItem component={ItemLink} button={true}>
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

export default withStyles(styles)(ArticleListItem);
