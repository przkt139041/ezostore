import { useEffect, useState, useCallback } from "react";
import { Product } from "@/types";
import { fetchCart } from "@/utils/cart-handler"; // ← Twój fetchCart()

export type CartItem = {
  product: Product;
  quantity: number;
};

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCart = useCallback(async () => {
    setLoading(true);
    try {
      const { cartItems, totalPrice } = await fetchCart();
      setCartItems(cartItems);
      setTotalPrice(totalPrice);
      setError(null);
    } catch (err) {
      console.error("Błąd koszyka:", err);
      setError("Nie udało się pobrać koszyka");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return {
    cartItems,
    totalPrice,
    loading,
    error,
    refetch: loadCart,
  };
}
