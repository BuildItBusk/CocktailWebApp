import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

type CocktailParams = {
  cocktailId: string
};

 async function fetchCocktailByName(name: string): Promise<Cocktail | null> {
  return fetch('/cocktails.json')
    .then((response) => response.json())
    .then((cocktails: Cocktail[]) => cocktails.find((c) => c.name === name) ?? null);
}

const Cocktail = () => {
  const { cocktailId } = useParams<CocktailParams>();
  const cocktailIdString = cocktailId ?? '';
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const imagePath = `/${cocktail?.image}`;

  useEffect(() => {
    fetchCocktailByName(cocktailIdString).then(setCocktail);
  }, [cocktailIdString]);

  useEffect(() => {
    if (cocktail) {
      document.title = cocktail.name;
    }
  }, [cocktail]);

  return (
    <>
      <div className="container mx-auto">
          <h1 className="text-4xl lg:text-6xl mb-6">{ cocktail?.name }</h1>
          <div className="flex justify-center items-center">
            <div className="w-max">
              <img src={imagePath} alt={cocktail?.name} className="mx-auto max-h-52 md:max-h-96 mb-6 rounded-lg" />
              <div className="text-left">
                <ul className="list-disc ml-5">
                  {cocktail?.ingredients.map((ingredient) => (
                    <li key={ingredient.name} className="text-xl md:text-3xl">
                        <span className="text-orange-200">{ingredient.quantity} {ingredient.unit}</span> {ingredient.name}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xl md:text-3xl">
                  {cocktail?.recipe}
                </p>
              </div>
            </div>
          </div>
      </div>
    </> 
  )
}

export default Cocktail;