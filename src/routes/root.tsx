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
        <h1 className='mb-4'>All The Cocktails</h1>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
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
