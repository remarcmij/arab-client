import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import Types from 'Types';
import { LinkProps } from '@material-ui/core/Link';

const styles = () =>
  createStyles({
    blueAvatar: {
      color: '#fff',
      backgroundColor: blue[500],
    },
  });

type Props = {
  publication: Types.Topic;
} & WithStyles<typeof styles>;

const PublicationListItem: React.FC<Props> = props => {
  const {
    classes,
    publication: { filename, title, subtitle },
  } = props;
  const [publication] = filename.split('.');

  const ItemLink = React.forwardRef<LinkProps, any>((p, ref) => (
    <Link ref={ref} to={`/content/${publication}`} {...p} />
  ));

  return (
    <ListItem component={ItemLink} button={true}>
      <ListItemAvatar>
        <Avatar classes={{ colorDefault: classes.blueAvatar }}>
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

export default withStyles(styles)(PublicationListItem);
