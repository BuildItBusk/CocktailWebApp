import './root.css'
import CardLink from './CardLink';
import { Cocktail } from '../types';
import { FormEvent, useEffect, useState } from "react";

function Root() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  
  useEffect(() => {
    fetchCocktails().then((cocktails: Cocktail[]) => {
      setCocktails(cocktails);
    });
  }, []);

  const filteredCocktails: Cocktail[] = filterCocktails(cocktails);

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
 
  function filterCocktails(cocktails: Cocktail[]): Cocktail[] {
    if (keyword.trim() === '') {
      return cocktails; 
    }
  
    const result: Cocktail[] = [];
  
    for (const cocktail of cocktails) {
      const { name, ingredients } = cocktail;
      const matchingIngredients = ingredients.filter(
        (ingredient) =>
          ingredient.name.toLowerCase() == keyword.toLowerCase()
      );
  
      if (
        name.toLowerCase().includes(keyword.toLowerCase()) ||
        matchingIngredients.length > 0
      ) {
        result.push(cocktail);
      }
    }
  
    return result;
  }
    
  return (
    <>
      <div className='w-full'>
        <div className='text-left bg-black flex items-center h-12'>
          <img src='/cocktail_icon.png' alt='Cocktail icon' className='h-full ml-4' />
          <h1 className='text-xl ml-1 font-bold inline-block align-middle'>
            <span className='text-orange-200'>Dirty</span> Drinking
          </h1>
        </div>
        
        <div className='m-6'>
          <label htmlFor="keyword-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input 
                type="search" 
                id="keyword-search" 
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search for cocktail name or key ingredient..." 
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
              />
          </div>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 m-6'>
          {filteredCocktails
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
