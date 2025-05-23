"use client";

import { Box, Typography, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { Menu } from "@mui/icons-material";
import { useRouter } from "next/navigation";

type Props = {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export default function Header({
  cartOpen,
  setCartOpen,
  menuOpen,
  setMenuOpen,
}: Props) {
  const [cartCount] = useState(0); // TODO: zamień na globalny stan (np. Zustand)
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        borderBottom: "1px solid #333",
        backgroundColor: "#000",
      }}
    >
      {/* Menu button */}
      <IconButton
        onClick={() => setMenuOpen(!menuOpen)}
        sx={{ width: 48, height: 48 }}
      >
        <Menu sx={{ color: "#facc15" }} />
      </IconButton>
      {/* Left spacer */}
      <Box sx={{ width: 128 }} />

      {/* Centered logo and text */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          cursor: "pointer",
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        <Box
          component="img"
          src="/assets/logowpg4.png"
          alt="Logo"
          sx={{
            width: 128,
            height: 128,
            overflow: "hidden",
            mr: 2,
            animation: "spin 8s linear infinite",
            "@keyframes spin": {
              from: { transform: "rotate(0deg)" },
              to: { transform: "rotate(360deg)" },
            },
          }}
        />
        <Box>
          <Typography
            sx={{
              color: "#facc15",
              fontSize: 20,
              letterSpacing: 5,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            wszystkie produkty galaktyki
          </Typography>
          <Typography
            sx={{
              color: "#facc15",
              fontSize: 12,
              letterSpacing: 3,
              textAlign: "center",
            }}
          >
            dla każdego coś 👁️👄👁️
          </Typography>
        </Box>
        <Box
          component="img"
          src="/assets/logowpg4.png"
          alt="Logo"
          sx={{
            width: 128,
            height: 128,
            overflow: "hidden",
            ml: 2,
            animation: "spin 8s linear infinite reverse",
            "@keyframes spin": {
              from: { transform: "rotate(0deg)" },
              to: { transform: "rotate(360deg)" },
            },
          }}
        />
      </Box>

      {/* Koszyk */}
      <IconButton
        onClick={() => {
          setCartOpen(!cartOpen);
        }}
      >
        <Badge badgeContent={cartCount ?? 0} color="success">
          <ShoppingCartIcon sx={{ color: "#facc15" }} />
        </Badge>
      </IconButton>
    </Box>
  );
}
