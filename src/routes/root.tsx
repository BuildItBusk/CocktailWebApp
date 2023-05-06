import './root.css'
import CardLink from './CardLink';
import cocktails from '../cocktails.json';

function Root() {
  
  interface Cocktail {
    name: string;
    ingredients: {
      name: string;
      quantity: string | number;
      unit: string;
    }[];
    recipe: string;
    image: string;
    story?: string;
    video?: string;
  }

  return (
    <>
      <div className='w-full'>
        <h1 className='mb-4'>All The Cocktails</h1>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
          {cocktails.map((cocktail: Cocktail) => (
            <CardLink 
              key={cocktail.name} 
              to={'./Cocktail/'.concat(cocktail.name)} 
              name={cocktail.name} 
              altText='Alt text' 
              imageUrl={cocktail.image} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Root
