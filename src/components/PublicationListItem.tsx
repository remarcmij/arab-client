import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  publication: IPublication;
}

export default function PublicationListItem(props: IProps) {
  const { publication, chapter, title, description } = props.publication;
  return (
    <li>
      <Link to={`/pub/${publication}`}>
        <h2>{title}</h2>
        <span dangerouslySetInnerHTML={{ __html: description || 'No description provided' }} />
      </Link>
    </li>
  );
}
