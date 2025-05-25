import { ProductFromApi } from "@/types";

export async function addToCart(productId: number) {
  await fetch(`${process.env.NEXT_PUBLIC_HOST_API}/koszyk`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: productId, quantity: 1 }),
  });
}

export async function fetchCart() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API}/koszyk`, {
    method: "GET",
    credentials: "include", // KLUCZOWE! umożliwia wysłanie ciasteczka sesji
  });

  if (!res.ok) {
    throw new Error("Nie udało się pobrać koszyka");
  }

  const cart = await res.json();
  const cartItems = cart.map(
    (item: { product: ProductFromApi; quantity: number }) => ({
      product: {
        id: item.product.id,
        name: item.product.nazwa,
        price: item.product.cena,
        image: item.product.zdj.split("/").pop() || "",
        category: item.product.kategoria,
        description: item.product.opis,
        stock: item.product.ilosc,
        rating: item.product.ocena,
        reviews: item.product.recenzje,
      },
      quantity: item.quantity,
    })
  );
  const totalPrice = cartItems.reduce(
    (acc: number, item: { product: { price: number }; quantity: number }) =>
      acc + item.product.price * item.quantity,
    0
  );
  return { cartItems, totalPrice };
}
