"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number, quantity: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API}/koszyk`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      const items = data.koszyk.map((item: any) => ({
        product: {
          id: item.product.id,
          name: item.product.nazwa,
          price: item.product.cena,
          image: item.product.zdj?.split("/").pop() || "",
          category: item.product.kategoria,
          description: item.product.opis,
          stock: item.product.ilosc,
          rating: item.product.ocena,
          reviews: item.product.recenzje,
        },
        quantity: item.quantity,
      }));

      setCartItems(items);
    } catch (e) {
      console.error("Błąd podczas pobierania koszyka:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const addToCart = async (productId: number, quantity = 1) => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST_API}/koszyk`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId, quantity }),
    });
    await refetch();
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST_API}/koszyk`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId, quantity }),
    });
    await refetch();
  };

  const removeFromCart = async (productId: number, quantity: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST_API}/koszyk`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId, quantity: -quantity }),
    });
    await refetch();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
};
