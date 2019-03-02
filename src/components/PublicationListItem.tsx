import Avatar from '@material-ui/core/Avatar'
import blue from '@material-ui/core/colors/blue'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Types from 'Types'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import FolderOpen from '@material-ui/icons/FolderOpen'

const styles = () =>
  createStyles({
    blueAvatar: {
      color: '#fff',
      backgroundColor: blue[500],
    },
  })

interface Props extends WithStyles<typeof styles> {
  publication: Types.AppDocument
}

const PublicationListItem: React.FC<Props> = props => {
  const { classes } = props
  const { filename, title, subtitle } = props.publication
  const [publication] = filename.split('.')

  const ItemLink = (p: {}) => <Link to={`/content/${publication}`} {...p} />

  return (
    <ListItem component={ItemLink} button={true}>
      <ListItemAvatar className={classes.blueAvatar}>
        <Avatar>
          <FolderOpen />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={<span dangerouslySetInnerHTML={{ __html: subtitle || '' }} />}
      />
    </ListItem>
  )
}

export default withStyles(styles)(PublicationListItem)
