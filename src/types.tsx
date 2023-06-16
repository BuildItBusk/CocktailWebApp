export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Cocktail {
  name: string;
  ingredients: Ingredient[];
  recipe: string;
  image: string;
  story: string;
  video: string;
}
