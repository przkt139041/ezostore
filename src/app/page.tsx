"use client";

import ProductCard from "@/components/ProductCard";
import { useTokenContext } from "@/context/TokenContext";
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  Container,
} from "@mui/material";
import Link from "next/link";

const categories = [
  { label: "🔮 Kamienie", href: "/kategoria/kamienie", color: "#ec4899" },
  { label: "🌫️ Kadzidełka", href: "/kategoria/kadzidełka", color: "#facc15" },
  { label: "🧿 Biżuteria", href: "/kategoria/biżuteria", color: "#4ade80" },
];

const featured = [
  {
    id: 1,
    name: "Kryształ Górski",
    price: 30,
    category: "kamienie",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Quartz_oisan.jpg/1024px-Quartz_oisan.jpg",
  },
  {
    id: 2,
    name: "Palo Santo",
    price: 15,
    category: "kadzidełka",
    image:
      "https://www.matemundo.pl/data/include/cms/matemundo_materialy-na-bloga/Do_srodka_mm_palo_santo_2.jpg",
  },
  {
    id: 3,
    name: "Oko Horusa",
    price: 45,
    category: "talizmany",
    image:
      "https://thumbs.img-sprzedajemy.pl/350x250c/59/09/57/piekny-naszyjnik-orgonit-malachit-oko-tygrysie-chorzow-sprzedam-556490322.jpg",
  },
];

export default function FrontPage() {
  const { isTokenValid, specialItems } = useTokenContext();

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
        fontFamily: '"Courier New", monospace',
        background: isTokenValid
          ? "conic-gradient(from 90deg at 50% 50%, #facc15, #ec4899, #4ade80, #6366f1, #f472b6, #facc15 100%)"
          : "#000000",
        backgroundSize: isTokenValid ? "200% 200%" : undefined,
        animation: isTokenValid ? "psyGradient 6s linear infinite" : undefined,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          py: 4,
          background: isTokenValid
            ? "repeating-conic-gradient(from 0deg at 50% 50%, #facc15 0deg 30deg, #ec4899 30deg 60deg, #4ade80 60deg 90deg, #6366f1 90deg 120deg, #f472b6 120deg 150deg, #facc15 150deg 180deg)"
            : "linear-gradient(90deg, #facc15, #ec4899, #4ade80)",
          backgroundSize: "200% 200%",
          animation: isTokenValid
            ? "psyGradient 8s linear infinite"
            : undefined,
          border: "4px double #fff",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#000",
            textShadow: "1px 1px 0 #fff, 2px 2px 0 #ec4899, 0 0 10px #f472b6",
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
        {isTokenValid && specialItems.length > 0 && (
          <Grid item xs={12} sm={6} md={4} key={"DOBRA SPEJALNE"}>
            <Link href="/kategoria/special">
              <Button
                fullWidth
                sx={{
                  border: `3px dashed red`,
                  backgroundColor: "#000",
                  color: "red",
                  py: 2.5,
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  fontFamily: '"Courier New", monospace',
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#000",
                    borderColor: "#fff",
                  },
                }}
              >
                👁️👄👁️ DOBRA SPECJALNE
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>

      <Divider sx={{ borderColor: "#999", mb: 6 }} />

      {isTokenValid && specialItems.length > 0 && (
        <Box sx={{ mb: 4, textAlign: "center" }}>
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
          <Grid container spacing={2} justifyContent="center">
            {specialItems.slice(0, 3).map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <ProductCard product={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Styl animacji */}
      <style jsx global>{`
        @keyframes psyGradient {
          0% {
            background-position: 0% 50%;
            filter: hue-rotate(0deg) saturate(1.2) brightness(1.1);
          }
          25% {
            background-position: 50% 100%;
            filter: hue-rotate(90deg) saturate(1.5) brightness(1.2);
          }
          50% {
            background-position: 100% 50%;
            filter: hue-rotate(180deg) saturate(2) brightness(1.3);
          }
          75% {
            background-position: 50% 0%;
            filter: hue-rotate(270deg) saturate(1.5) brightness(1.2);
          }
          100% {
            background-position: 0% 50%;
            filter: hue-rotate(360deg) saturate(1.2) brightness(1.1);
          }
        }
      `}</style>
    </Container>
  );
}
