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
  return fetch(`${import.meta.env.BASE_URL}src/cocktails.json`)
    .then((response) => response.json())
    .then((cocktails: Cocktail[]) => cocktails.find((c) => c.name === name) ?? null);
}

const Cocktail = () => {
  const { cocktailId } = useParams<CocktailParams>();
  const cocktailIdString = cocktailId ?? '';
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const imagePath = `${import.meta.env.BASE_URL}src/assets/${cocktail?.image}`;

  useEffect(() => {
    fetchCocktailByName(cocktailIdString).then(setCocktail);
  }, []);

  return (
    <>
      <div className="container mx-auto">
          <h1 className="mb-6">{ cocktail?.name }</h1>
          <div className="flex justify-center items-center">
            <div className="w-max">
              <img src={imagePath} alt={cocktail?.name} className="mx-auto max-h-52 md:max-h-96 mb-4 rounded-lg" />
              <div className="text-left">
                <ul className="list-disc">
                  {cocktail?.ingredients.map((ingredient) => (
                    <li key={ingredient.name} className="text-xl md:text-3xl">
                        <span className="text-orange-200">{ingredient.quantity} {ingredient.unit}</span> of {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
      </div>
    </> 
  )
}

export default Cocktail;