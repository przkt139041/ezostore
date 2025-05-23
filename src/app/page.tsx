"use client";

import ProductCard from "@/components/ProductCard";
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  Container,
  Stack,
} from "@mui/material";
import Link from "next/link";

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
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
        fontFamily: '"Courier New", monospace',
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          py: 4,
          background: "linear-gradient(90deg, #facc15, #ec4899, #4ade80)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 10s ease infinite",
          border: "4px double #fff",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#000",
            textShadow: "1px 1px 0 #fff, 2px 2px 0 #ec4899",
            fontWeight: 900,
            letterSpacing: 4,
            fontSize: "2.8rem",
          }}
        >
          ✨ Witaj w GALAKTYCZNYM SKLEPIE ✨
        </Typography>
        <Typography sx={{ color: "#000", mt: 2, fontSize: "1.1rem" }}>
          💫 Artefakty ezoteryczne • Magiczne kadzidła • Ochronne talizmany 💫
        </Typography>
      </Box>

      {/* Kategorie 90s */}
      <Typography
        variant="h4"
        sx={{
          color: "#ec4899",
          fontWeight: 700,
          textAlign: "center",
          mb: 3,
          letterSpacing: 2,
          textTransform: "uppercase",
          textShadow: "1px 1px 0 #fff",
        }}
      >
        ➤ Przeglądaj kategorie
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mb: 8 }}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={4} key={cat.label}>
            <Link href={cat.href}>
              <Button
                fullWidth
                sx={{
                  border: `3px dashed ${cat.color}`,
                  backgroundColor: "#000",
                  color: cat.color,
                  py: 2.5,
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  fontFamily: '"Courier New", monospace',
                  "&:hover": {
                    backgroundColor: cat.color,
                    color: "#000",
                    borderColor: "#fff",
                  },
                }}
              >
                {cat.label}
              </Button>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ borderColor: "#999", mb: 6 }} />

      {/* Polecane */}
      <Typography
        variant="h4"
        sx={{
          color: "#4ade80",
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
          textShadow: "0 0 6px #4ade80",
          letterSpacing: 1,
        }}
      >
        ✹ Polecane artefakty ✹
      </Typography>

      <Grid container spacing={4}>
        {featured.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Styl animacji */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Container>
  );
}
