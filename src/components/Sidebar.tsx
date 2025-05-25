"use client";

import { Box, Divider, List, Typography, Link as MuiLink } from "@mui/material";
import { useRouter } from "next/navigation";

const categories = ["Kamienie", "Kadzidełka", "Biżuteria"];

export default function Sidebar() {
  const router = useRouter();
  return (
    <>
      <Typography
        variant="h6"
        sx={{ color: "#facc15", mb: 2, fontWeight: 600 }}
      >
        Kategorie
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "#333" }} />
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <List>
          {categories.map((cat) => (
            <Typography
              key={cat}
              variant="body1"
              sx={{
                color: "#4ade80",
                mb: 1,
                fontWeight: 400,
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                router.push(
                  `/kategoria/${encodeURIComponent(cat.toLowerCase())}`
                );
              }}
            >
              {cat}
            </Typography>
          ))}
        </List>
      </Box>
    </>
  );
}
