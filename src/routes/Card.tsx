import React from 'react';
import './Card.css'

interface CardProps {
  imageUrl: string;
  altText: string;
  name: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, altText, name }) => {
  const imagePath = `/${imageUrl}`;
  return (
    <div className="relative w-full pb-full ">
      <img className="w-full h-full rounded-lg" src={imagePath} alt={altText} />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <p className="text-white text-3xl md:text-6xl font-bold text-shadow">{name}</p>
      </div>
    </div>
  );
};

export default Card;
