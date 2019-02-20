import * as React from 'react'
import ContentListItem from './ContentListItem'
import Types from 'Types'

type Props = {
  publications: Types.Document[]
}

const ContentList: React.FC<Props> = props => {
  const { publications } = props
  return (
    <ul>
      {publications.map(publication => (
        <ContentListItem
          key={`${publication.publication}.${publication.chapter}`}
          publication={publication}
        />
      ))}
    </ul>
  )
}

export default ContentList
