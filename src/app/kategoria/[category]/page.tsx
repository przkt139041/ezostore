"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Breadcrumbs,
  Link as MuiLink,
  IconButton,
  Grid,
} from "@mui/material";
import ProductCard from "@/components/ProductCard";
import { Product, ProductFromApi } from "@/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";
import { useTokenContext } from "@/context/TokenContext";

export default function CategoryPage() {
  const { category } = useParams() as { category: string };
  const { isTokenValid, specialItems } = useTokenContext();

  if (category == "special" && !isTokenValid) {
    return (
      <Typography sx={{ color: "#f87171", mt: 4 }}>
        404 - Nie znaleziono strony
      </Typography>
    );
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_API}/kategoria/${category}`
        );
        const data = await res.json();
        if (!data || !Array.isArray(data)) {
          return;
        }
        const newData = data.map((item: ProductFromApi) => ({
          id: item.id,
          name: item.nazwa,
          price: item.cena,
          image: item.zdj.split("/").pop() || "",
          category: item.kategoria,
          description: item.opis,
          stock: item.ilosc,
          rating: item.ocena,
          reviews: item.recenzje,
        }));

        setProducts(newData);
      } catch (err) {
        console.error("Błąd podczas pobierania produktów:", err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  return (
    <Box sx={{ px: 4, py: 6 }}>
      {/* Strzałka wstecz */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <IconButton onClick={() => router.push("/")} sx={{ color: "#facc15" }}>
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

          <Typography sx={{ color: "#fff" }}>
            {decodeURIComponent(category).toUpperCase()}
          </Typography>
        </Breadcrumbs>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress sx={{ color: "#facc15" }} />
        </Box>
      ) : products.length > 0 ? (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ color: "#f87171", mt: 4 }}>
          Brak produktów w tej kategorii.
        </Typography>
      )}
    </Box>
  );
}
