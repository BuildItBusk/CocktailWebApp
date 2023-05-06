import { Link } from 'react-router-dom';
import Card from './Card';

type CardLinkProps = {
    to: string;
    name: string;
    altText: string;
    imageUrl: string;
  };

function CardLink(props: CardLinkProps) {
  const { to, name, altText, imageUrl } = props;
  return (
    <Link to={to}>
      <Card name={name} altText={altText} imageUrl={imageUrl} />
    </Link>
  );
}

export default CardLink;