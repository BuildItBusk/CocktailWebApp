import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Tag from "./Tag";
import { Cocktail } from "./types";

type CocktailParams = {
  cocktailId: string
};

 async function fetchCocktailByName(name: string): Promise<Cocktail | null> {
  return fetch('/cocktails.json')
    .then((response) => response.json())
    .then((cocktails: Cocktail[]) => cocktails.find((c) => c.name === name) ?? null);
}

const CocktailPage = () => {
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
          <h1 className="text-4xl lg:text-6xl m-6">{ cocktail?.name }</h1>
          <div className="flex justify-center items-center">
            <div className="w-max mx-10">
              <img src={imagePath} alt={cocktail?.name} className="mx-auto max-h-52 md:max-h-96 mb-6 rounded-lg" />
              <div className="text-left">
                <ul className="list-disc ml-5">
                  {cocktail?.ingredients.map((ingredient) => (
                    <li key={ingredient.name} className="text-xl md:text-3xl">
                        <span className="dark:text-orange-200 text-orange-800">{ingredient.quantity} {ingredient.unit}</span> {ingredient.name}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xl md:text-3xl">
                  {cocktail?.recipe}
                </p>
                {cocktail?.tags && cocktail.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {cocktail.tags.map((tag) => (
                    <Tag key={tag} tagText={tag} />
                  ))}
                </div>
              )}
              </div>
            </div>
          </div>
      </div>
    </> 
  )
}

export default CocktailPage;