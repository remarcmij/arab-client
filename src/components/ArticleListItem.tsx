import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Types from 'Types'

type Props = {
  publication: Types.AppDocument
}

const ArticleListItem: React.FC<Props> = props => {
  const { publication, article, title, subtitle } = props.publication

  const ItemLink = (p: {}) => <Link to={`/content/${publication}/${article}`} {...p} />

  return (
    <ListItem component={ItemLink}>
      <ListItemText
        primary={title}
        secondary={<span dangerouslySetInnerHTML={{ __html: subtitle || '' }} />}
      />
    </ListItem>
  )
}

export default ArticleListItem
