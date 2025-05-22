export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  stock?: number;
  rating?: number;
  reviews?: number;
};

export type ProductFromApi = {
  id: number;
  nazwa: string;
  cena: number;
  kategoria: string;
  zdj: string;
  opis?: string;
  ilosc?: number;
  ocena?: number;
  recenzje?: number;
};
