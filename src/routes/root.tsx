import './root.css'
import CardLink from './CardLink';
import { useEffect, useState } from "react";

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

  async function fetchCocktails(): Promise<Cocktail[]> {
    return fetch('/cocktails.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch cocktails: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: Cocktail[]) => data)
      .catch(error => {
        console.error(error);
        return [] as Cocktail[];
      });
  }

  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  
  useEffect(() => {
    fetchCocktails().then(data => setCocktails(data));
  }, []);
  
  return (
    <>
      <div className='w-full'>
        <div className='text-left bg-black flex items-center h-12'>
          <img src='/cocktail_icon.png' alt='Cocktail icon' className='h-full ml-4' />
          <h1 className='text-xl ml-1 font-bold inline-block align-middle'>
            <span className='text-orange-200'>Dirty</span> Drinking
          </h1>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 m-6'>
          {cocktails
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((cocktail: Cocktail) => (
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
