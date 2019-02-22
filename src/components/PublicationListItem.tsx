import * as React from 'react'
import { Link } from 'react-router-dom'
import Types from 'Types'

type Props = {
  publication: Types.AppDocument
}

const PublicationListItem: React.FC<Props> = props => {
  const { publication, chapter, title, description } = props.publication
  return (
    <li>
      <Link to={`/content/${publication}/index`}>
        <h2>{title}</h2>
        <span dangerouslySetInnerHTML={{ __html: description || 'No description provided' }} />
      </Link>
    </li>
  )
}

export default PublicationListItem
