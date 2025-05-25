"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";

type CartItem = {
  product: Product;
  quantity: number;
};

type TokenContextType = {
  isTokenValid: boolean;
  specialItems: Product[];
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [specialItems, setSpecialItems] = useState<Product[]>([]);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API}/special`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!data || !data.special || data.special.length === 0) {
        setIsTokenValid(false);
        setSpecialItems([]);
        return;
      }

      const items = data.special.map((item: any) => ({
        id: item.id,
        name: item.nazwa,
        price: item.cena,
        image: item.zdj?.split("/").pop() || "",
        category: item.kategoria,
        description: item.opis,
        stock: item.ilosc,
        rating: item.ocena,
        reviews: item.recenzje,
      }));

      setSpecialItems(items);
      setIsTokenValid(true);
    } catch (e) {
      console.error("Błąd podczas pobierania koszyka:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <TokenContext.Provider value={{ isTokenValid, specialItems }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const ctx = useContext(TokenContext);
  if (!ctx)
    throw new Error("useTokenContext must be used within TokenProbider");
  return ctx;
};
