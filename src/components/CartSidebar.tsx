"use client";

import { Delete } from "@mui/icons-material";
import { Divider, List, Stack, Typography } from "@mui/material";
import { useCart } from "@/hooks/useCart";

export default function CartSidebar() {
  const { cartItems, refetch, loading } = useCart();

  const updateQuantity = async (id: number, quantity: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, quantity }),
    });
    await refetch();
  };

  const removeFromCart = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    await refetch();
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{ color: "#facc15", mb: 2, fontWeight: 600 }}
      >
        Koszyk
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "#333" }} />

      {loading ? (
        <Typography sx={{ color: "#facc15" }}>Ładowanie...</Typography>
      ) : cartItems.length === 0 ? (
        <Typography sx={{ color: "#ccc" }}>Koszyk jest pusty.</Typography>
      ) : (
        <List>
          {cartItems.map(({ product, quantity }) => (
            <li
              key={product.id}
              style={{ listStyle: "none", marginBottom: 12 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#4ade80",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#fde047",
                  },
                }}
              >
                <span style={{ flex: 1 }}>{product.name}</span>
                <span style={{ fontWeight: 400, opacity: 0.8 }}>
                  {quantity} szt
                </span>
              </Typography>

              <Stack
                direction={"row"}
                spacing={1}
                sx={{ mt: 1, justifyContent: "space-between" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#4ade80",
                    fontWeight: 400,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <span
                    onClick={() =>
                      updateQuantity(product.id, Math.max(1, quantity - 1))
                    }
                    style={{ cursor: "pointer" }}
                  >
                    -
                  </span>

                  <span
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    style={{ cursor: "pointer" }}
                  >
                    +
                  </span>
                </Typography>

                <Delete
                  sx={{
                    color: "#f87171",
                    cursor: "pointer",
                    "&:hover": { color: "#ef4444" },
                  }}
                  onClick={() => removeFromCart(product.id)}
                />
              </Stack>

              <Divider sx={{ borderColor: "#333", my: 1 }} />
            </li>
          ))}
        </List>
      )}
    </>
  );
}
