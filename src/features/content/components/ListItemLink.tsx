import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

type Props = {
  to: string;
};

const ListItemLink: React.FC<Props> = props => {
  const { to } = props;

  const renderLink = React.useMemo(() => {
    const x = React.forwardRef<HTMLAnchorElement>((linkProps, ref) => (
      <Link to={to} {...linkProps} innerRef={ref} />
    ));
    x.displayName = 'RenderLink';
    return x;
  }, [to]);

  return (
    <li>
      <ListItem component={renderLink as any}>{props.children}</ListItem>
    </li>
  );
};

export default ListItemLink;
