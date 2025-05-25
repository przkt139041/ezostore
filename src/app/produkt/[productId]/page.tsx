"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Stack,
  Breadcrumbs,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Product } from "@/types";
import NextLink from "next/link";
import { useCartContext } from "@/context/CartContext";

export default function ProductPage() {
  const router = useRouter();
  const { productId } = useParams() as { productId: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [widthExpanded, setWidthExpanded] = useState(false);
  const [heightExpanded, setHeightExpanded] = useState(false);

  useEffect(() => {
    const w = setTimeout(() => setWidthExpanded(true), 100); // start width animation
    const h = setTimeout(() => setHeightExpanded(true), 100); // start height after width

    return () => {
      clearTimeout(w);
      clearTimeout(h);
    };
  }, []);

  const { addToCart, loading: loadingAddToCart } = useCartContext();

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
          stock: data.ilosc ?? 173,
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
      {/* Strzałka wstecz */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <IconButton onClick={() => router.back()} sx={{ color: "#facc15" }}>
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs separator="›" aria-label="breadcrumbs">
          <MuiLink
            component={NextLink}
            href="/"
            underline="hover"
            sx={{ color: "#facc15" }}
          >
            STRONA GŁÓWNA
          </MuiLink>
          <MuiLink
            component={NextLink}
            href={`/kategoria/${encodeURIComponent(
              product.category
            ).toLowerCase()}`}
            underline="hover"
            sx={{ color: "#facc15" }}
          >
            {product.category.toUpperCase()}
          </MuiLink>
          <Typography sx={{ color: "#fff" }}>
            {product.name.toUpperCase()}
          </Typography>
        </Breadcrumbs>
      </Stack>

      {/* Produkt */}
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          border: "4px solid #ec4899",
          backgroundColor: "#6b21a8",
          width: widthExpanded ? "100%" : "20%",
          maxHeight: heightExpanded ? 1000 : 300, // wartość maxHeight wystarczająca dla treści
          overflow: "hidden",
          transition:
            "width 0.7s ease, max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.7s", // opóźniamy start animacji wysokości
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

        <CardContent
          sx={{
            flex: 1,
            opacity: heightExpanded ? 1 : 0,
            transition: "opacity 0.7s ease 1s",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#facc15",
              mb: 1,
            }}
          >
            {product.name}
          </Typography>

          <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
            {product.price} zł
          </Typography>

          {/* Ocena */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Rating
              name="read-only"
              value={product.rating || Math.random() + 3}
              precision={0.5}
              readOnly
              sx={{ color: "#facc15" }}
            />
            <Typography sx={{ color: "#e5e5e5", fontSize: 14 }}>
              ({product.reviews ?? (Math.random() * 100).toFixed()} recenzji)
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
              <strong>Dostępny</strong>
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
            onClick={async () => {
              await addToCart(product.id);
            }}
            loading={loadingAddToCart}
          >
            Do koszyka
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
