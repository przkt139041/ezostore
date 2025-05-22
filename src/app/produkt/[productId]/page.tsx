"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Rating,
  Stack,
} from "@mui/material";
import { Product } from "@/types";

export default function ProductPage() {
  const { productId } = useParams() as { productId: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_API}/produkty/${productId}`
        );
        const data = await res.json();

        const newData: Product = {
          id: data.id,
          name: data.nazwa,
          price: data.cena,
          image: data.zdj.split("/").pop() || "",
          category: data.kategoria,
          description: data.opis,
          stock: data.ilosc,
          rating: data.ocena,
          reviews: data.recenzje,
        };

        setProduct(newData);
      } catch (err) {
        console.error("Błąd podczas pobierania produktu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress sx={{ color: "#facc15" }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography sx={{ color: "#f87171", mt: 4 }}>
        Produkt nie został znaleziony.
      </Typography>
    );
  }

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          border: "4px solid #ec4899",
          backgroundColor: "#6b21a8",
        }}
      >
        <CardMedia
          component="img"
          image={`/pics/${product.image}`}
          alt={product.name}
          sx={{
            width: { xs: "100%", md: 300 },
            height: 300,
            objectFit: "cover",
            borderRight: "2px solid #facc15",
          }}
        />

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ color: "#facc15", mb: 1 }}>
            {product.name}
          </Typography>

          <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
            {product.price} zł
          </Typography>

          {/* Ocena */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Rating
              name="read-only"
              value={product.rating || 0}
              precision={0.5}
              readOnly
              sx={{ color: "#facc15" }}
            />
            <Typography sx={{ color: "#e5e5e5", fontSize: 14 }}>
              ({product.reviews ?? 0} recenzji)
            </Typography>
          </Stack>

          {/* Opis */}
          {product.description && (
            <Typography sx={{ color: "#ddd", mb: 3 }}>
              {product.description}
            </Typography>
          )}

          {/* Stan magazynowy */}
          <Typography sx={{ color: "#a3e635", fontSize: 14, mb: 2 }}>
            Dostępność:{" "}
            {product.stock && product.stock > 0 ? (
              <strong>{product.stock} sztuk</strong>
            ) : (
              <span style={{ color: "#f87171" }}>Brak w magazynie</span>
            )}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#facc15",
              color: "#000",
              "&:hover": {
                backgroundColor: "#fde047",
              },
              mt: 1,
            }}
            fullWidth
            disabled={!product.stock}
          >
            Do koszyka
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
