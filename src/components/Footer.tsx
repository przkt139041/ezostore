"use client";

import { Box, Typography, Link as MuiLink, Divider } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        pt: 4,
        pb: 6,
        borderTop: "1px dashed #666",
        textAlign: "center",
        backgroundColor: "#0a0a0a",
        height: "20vh",
      }}
    >
      <Box sx={{ mb: 2 }}>
        {/* <Typography
          variant="h6"
          sx={{
            color: "#facc15",
            fontFamily: '"Courier New", monospace',
            fontWeight: 700,
            letterSpacing: 3,
            mb: 1,
          }}
        >
          wszystkie produkty galaktyki
        </Typography> */}

        <Typography variant="body2" sx={{ color: "#999", fontSize: "0.85rem" }}>
          ✦ Artefakty, kadzidła i talizmany z innej rzeczywistości ✦
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#333", my: 3, mx: "auto", width: "60%" }} />

      <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
        <MuiLink
          component={Link}
          href="/polityka-prywatnosci"
          underline="hover"
          sx={{
            color: "#4ade80",
            fontSize: "0.9rem",
            "&:hover": { color: "#facc15" },
          }}
        >
          Polityka prywatności
        </MuiLink>

        <MuiLink
          component={Link}
          href="/regulamin"
          underline="hover"
          sx={{
            color: "#4ade80",
            fontSize: "0.9rem",
            "&:hover": { color: "#facc15" },
          }}
        >
          Regulamin serwisu
        </MuiLink>
      </Box>

      <Typography
        sx={{ color: "#666", mt: 3, fontSize: "0.75rem", fontStyle: "italic" }}
      >
        © {new Date().getFullYear()} Galaktyczny Sklep ✦ Wszystkie prawa
        zastrzeżone
      </Typography>
    </Box>
  );
}
