import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Types from 'Types'

type Props = {
  publication: Types.AppDocument
}

const PublicationListItem: React.FC<Props> = props => {
  const { publication, title, description } = props.publication

  const ItemLink = (p: {}) => <Link to={`/content/${publication}/index`} {...p} />

  return (
    <ListItem component={ItemLink}>
      <ListItemText
        primary={title}
        secondary={<span dangerouslySetInnerHTML={{ __html: description || '' }} />}
      />
    </ListItem>
  )
}

export default PublicationListItem
