import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import { LinkProps } from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import Types from 'Types';

const useStyles = makeStyles({
  blueAvatar: {
    color: '#fff',
    backgroundColor: blue[500],
  },
});

type Props = Readonly<{
  publication: Types.Topic;
}>;

const PublicationListItem: React.FC<Props> = props => {
  const classes = useStyles();
  const {
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

export default PublicationListItem;
