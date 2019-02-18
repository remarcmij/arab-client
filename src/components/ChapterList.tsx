import * as React from 'react'
import ChapterListItem from './ChapterListItem'

type Props = {
  publications: Publication[]
}

const ChapterList: React.FC<Props> = props => {
  const { publications } = props
  return (
    <ul>
      {publications.map(publication => (
        <ChapterListItem
          key={`${publication.publication}.${publication.chapter}`}
          publication={publication}
        />
      ))}
    </ul>
  )
}

export default ChapterList
