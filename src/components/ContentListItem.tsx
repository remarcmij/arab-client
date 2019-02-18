import * as React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  publication: Publication
}

const ContentListItem: React.FC<Props> = props => {
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

export default ContentListItem
