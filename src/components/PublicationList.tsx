import * as React from 'react';
import PublicationListItem from './PublicationListItem';

interface IProps {
  publications: IPublication[];
}

export default function PublicationList(props: IProps) {
  const { publications } = props;
  return (
    <ul>
      {publications.map(publication => (
        <PublicationListItem
          key={`${publication.publication}.${publication.chapter}`}
          publication={publication}
        />
      ))}
    </ul>
  );
}
