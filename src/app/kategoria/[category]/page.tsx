"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import ProductCard from "@/components/ProductCard";
import { Product, ProductFromApi } from "@/types";

export default function CategoryPage() {
  const { category } = useParams() as { category: string };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_API}/kategoria/${category}`
        );
        const data = await res.json();
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
      <Typography
        variant="h4"
        sx={{ color: "#facc15", fontWeight: 600, mb: 4 }}
      >
        {decodeURIComponent(category).toUpperCase()}
      </Typography>

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
