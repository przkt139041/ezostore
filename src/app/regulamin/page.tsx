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
          <Typography sx={{ color: "#fff" }}>REGULAMIN</Typography>
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
          <Typography sx={{ color: "#ddd", mb: 3 }}>
            <Box component="span" display="block" mb={2}>
              <b>
                REGULAMIN SKLEPU INTERNETOWEGO "Wszystkie Produkty Galaktyki"
              </b>
            </Box>
            <Box component="span" display="block" mb={2}>
              <b>§1 POSTANOWIENIA OGÓLNE</b>
              <br />
              Sklep internetowy "Wszystkie Produkty Galaktyki" prowadzony jest
              przez Słodycze & Kraśnik Sp. z o.o. Regulamin określa zasady
              korzystania ze sklepu oraz zawierania umów sprzedaży.
            </Box>
            <Box component="span" display="block" mb={2}>
              <b>§2 DEFINICJE</b>
              <br />
              Sklep - serwis internetowy działający pod adresem
              www.wszystkie-produkty-galaktyki.com
              <br />
              Klient - osoba fizyczna lub prawna dokonująca zakupów
              <br />
              Towar - produkty oferowane w sklepie
            </Box>
            <Box component="span" display="block" mb={2}>
              <b>§3 SKŁADANIE ZAMÓWIEŃ</b>
              <br />
              Zamówienia można składać 24 godziny na dobę przez formularz
              internetowy.
              <br />
              Potwierdzenie zamówienia następuje automatycznie na adres e-mail.
            </Box>
            <Box component="span" display="block" mb={2}>
              <b>§4 CENY I PŁATNOŚCI</b>
              <br />
              Ceny podane są w złotych polskich i zawierają podatek VAT.
              <br />
              Akceptujemy płatności w kryptowalutach oraz przelewy zagraniczne.
            </Box>
            <Box component="span" display="block" mb={2}>
              <b>§5 DOSTAWA</b>
              <br />
              Realizujemy dostawy na terenie całej Polski.
              <br />
              Czas dostawy wynosi 3-7 dni roboczych.
            </Box>
            <Box component="span" display="block" mb={2}>
              <b>§6 REKLAMACJE</b>
              <br />
              Reklamacje można składać na adres:
              wszystkie.produkty.galaktyki@proton.me
              <br />
              Rozpatrzenie reklamacji następuje w terminie 14 dni.
            </Box>
            <Box component="span" display="block" mb={2}>
              <b>§7 POSTANOWIENIA KOŃCOWE</b>
              <br />
              W sprawach nieuregulowanych zastosowanie ma polskie prawo.
              <br />
              Regulamin wchodzi w życie z dniem opublikowania.
              <br />
              Data ostatniej aktualizacji: 01.01.2017
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
