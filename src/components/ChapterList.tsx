import * as React from 'react';
import ChapterListItem from './ChapterListItem';

interface IProps {
  publications: IPublication[];
}

export default function ChapterList(props: IProps) {
  const { publications } = props;
  return (
    <ul>
      {publications.map(publication => (
        <ChapterListItem
          key={`${publication.publication}.${publication.chapter}`}
          publication={publication}
        />
      ))}
    </ul>
  );
}
