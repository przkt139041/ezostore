"use client";

import ProductCard from "@/components/ProductCard";
import { Box, Typography, Grid, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const categories = [
  { label: "🔮 Kamienie", href: "/kategoria/kamienie", color: "#ec4899" },
  { label: "🌫️ Kadzidełka", href: "/kategoria/kadzidelka", color: "#facc15" },
  { label: "🧿 Talizmany", href: "/kategoria/talizmany", color: "#4ade80" },
];

const featured = [
  {
    id: 1,
    name: "Kryształ Górski",
    price: 30,
    category: "kamienie",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Rock_Crystal.jpg/320px-Rock_Crystal.jpg",
  },
  {
    id: 2,
    name: "Palo Santo",
    price: 15,
    category: "kadzidełka",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Palo_Santo.jpg/320px-Palo_Santo.jpg",
  },
  {
    id: 3,
    name: "Oko Horusa",
    price: 45,
    category: "talizmany",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Protective_amulet%2C_Egypt.jpg/320px-Protective_amulet%2C_Egypt.jpg",
  },
];

export default function FrontPage() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      {/* Powitanie */}
      <Typography
        variant="h2"
        sx={{
          color: "#facc15",
          textAlign: "center",
          fontWeight: 700,
          letterSpacing: 2,
          mb: 2,
        }}
      >
        🌌 Witaj w Galaktycznym Sklepie 🌌
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", color: "#ddd", mb: 6 }}
      >
        Odkryj tajemnicze artefakty, kadzidła i kamienie dla duszy i ciała ✨
      </Typography>

      {/* Kategorie */}
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={4} key={cat.label}>
            <Link href={cat.href}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: cat.color,
                  color: cat.color,
                  fontWeight: 600,
                  fontSize: 18,
                  letterSpacing: 2,
                  py: 2,
                  "&:hover": {
                    backgroundColor: cat.color,
                    color: "#000",
                  },
                }}
              >
                {cat.label}
              </Button>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Bestsellery */}
      <Typography
        variant="h4"
        sx={{
          color: "#facc15",
          fontWeight: 600,
          letterSpacing: 2,
          mb: 4,
          textAlign: "center",
        }}
      >
        🌟 Najczęściej wybierane 🌟
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {featured.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </Grid>
    </Box>
  );
}
