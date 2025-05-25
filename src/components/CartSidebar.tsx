"use client";

import { Delete } from "@mui/icons-material";
import { Box, Button, Divider, List, Stack, Typography } from "@mui/material";
import { useCart } from "@/hooks/useCart";
import { useCartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { cartItems, loading, updateQuantity, removeFromCart } =
    useCartContext();

  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // kluczowe!
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "#facc15", mb: 2, fontWeight: 600 }}
      >
        Koszyk
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "#333" }} />

      {/* Lista produktów */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          pr: 1,
          mb: 2,
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {loading ? (
          <Typography sx={{ color: "#facc15" }}>Ładowanie...</Typography>
        ) : cartItems.length === 0 ||
          cartItems.reduce((sum, { quantity }) => sum + quantity, 0) <= 0 ? (
          <Typography sx={{ color: "#ccc" }}>Koszyk jest pusty.</Typography>
        ) : (
          <List>
            {cartItems.map(({ product, quantity }) => {
              if (quantity <= 0) return null; // Pomiń produkty z ilością 0
              return (
                <li
                  key={product.id}
                  style={{ listStyle: "none", marginBottom: 12 }}
                >
                  <Box
                    component={"img"}
                    src={`/pics/${product.image}`}
                    alt={product.name}
                    sx={{
                      width: "60%",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "2px solid #facc15",
                      margin: 1,
                      mt: 3,
                      justifySelf: "center",
                      display: "block",
                    }}
                  />
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
                    <span
                      style={{ flex: 1 }}
                      onClick={() => router.push("/produkt/" + product.id)}
                    >
                      {product.name}
                    </span>
                    <span style={{ fontWeight: 400, opacity: 0.8 }}>
                      {quantity} szt
                    </span>
                  </Typography>

                  <Stack
                    direction="row"
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
                        onClick={() => updateQuantity(product.id, -1)}
                        style={{
                          cursor: "pointer",
                          transition: "transform 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.2)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        -
                      </span>
                      <span
                        onClick={() => updateQuantity(product.id, 1)}
                        style={{
                          cursor: "pointer",
                          transition: "transform 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.2)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
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
                      onClick={() => removeFromCart(product.id, quantity)}
                    />
                  </Stack>
                  <Divider sx={{ borderColor: "#333", my: 1 }} />
                </li>
              );
            })}
          </List>
        )}
      </Box>

      {/* Przycisk na dole */}
      <Box sx={{ mt: "auto" }}>
        <Button
          variant="contained"
          fullWidth
          onClick={async () => {
            router.push("/kasa");
          }}
          sx={{
            backgroundColor: "#facc15",
            color: "#000",
            "&:hover": {
              backgroundColor: "#fde047",
            },
          }}
          disabled={!cartItems || cartItems.length === 0}
        >
          Do kasy
        </Button>
      </Box>
    </Box>
  );
}
