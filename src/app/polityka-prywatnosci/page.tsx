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

  return (
    <Box sx={{ px: 4, py: 6 }}>
      {/* Strzałka wstecz */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <IconButton onClick={() => router.back()} sx={{ color: "#facc15" }}>
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs separator="›" aria-label="breadcrumbs">
          <Typography sx={{ color: "#fff" }}>POLITYKA PRYWATNOŚCI</Typography>
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
        <CardContent
          sx={{
            flex: 1,
            opacity: heightExpanded ? 1 : 0,
            transition: "opacity 0.7s ease 1s",
          }}
        >
          <Typography sx={{ color: "#ddd", mb: 3, whiteSpace: "pre-line" }}>
            <strong>POLITYKA PRYWATNOŚCI</strong>
            {"\n\n"}
            <strong>Wszystkie Produkty Galaktyki</strong>
            {"\n\n"}
            <strong>I. Administrator Danych</strong>
            {"\n"}
            Administratorem danych osobowych jest Słodycze & Kraśnik Sp. z o.o.
            z siedzibą w Kraśnik Dolny 45, 59-700 Kraśnik Dolny, wpisana do
            Krajowego Rejestru Sądowego pod numerem KRS 0000123456.
            {"\n\n"}
            <strong>II. Cele Przetwarzania Danych</strong>
            {"\n"}
            Przetwarzamy Państwa dane osobowe w następujących celach:
            {"\n"}- Realizacja zamówień i świadczenie usług
            {"\n"}- Komunikacja z klientami
            {"\n"}- Marketing bezpośredni produktów
            {"\n"}- Wypełnienie obowiązków prawnych
            {"\n\n"}
            <strong>III. Podstawa Prawna</strong>
            {"\n"}
            Podstawą przetwarzania danych jest wykonanie umowy oraz uzasadniony
            interes administratora w zakresie prowadzenia działalności
            gospodarczej.
            {"\n\n"}
            <strong>IV. Okres Przechowywania</strong>
            {"\n"}
            Dane będą przechowywane przez okres niezbędny do realizacji celów
            oraz przez okres wymagany przepisami prawa.
            {"\n\n"}
            <strong>V. Prawa Osób, Których Dane Dotyczą</strong>
            {"\n"}
            Przysługuje Państwu prawo dostępu do danych, ich sprostowania,
            usunięcia, ograniczenia przetwarzania oraz przenoszenia.
            {"\n\n"}
            <strong>VI. Kontakt</strong>
            {"\n"}W sprawach związanych z ochroną danych prosimy o kontakt:{" "}
            <strong>wszystkie.produkty.galaktyki@proton.me</strong>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
