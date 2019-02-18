import * as React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  publication: Publication
}

const ChapterListItem: React.FC<Props> = props => {
  const { publication, chapter, title, description } = props.publication
  return (
    <li>
      <Link to={`/content/${publication}/${chapter}`}>
        <h2>{title}</h2>
        <span dangerouslySetInnerHTML={{ __html: description || 'No description provided' }} />
      </Link>
    </li>
  )
}

export default ChapterListItem
