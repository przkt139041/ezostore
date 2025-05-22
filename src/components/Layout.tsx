"use client";

import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CartSidebar from "./CartSidebar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: `'Courier New', monospace`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header na górze */}
      <Header
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Główna część: sidebar + content */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar (left) */}
        <Box
          sx={{
            width: { xs: "100%", md: "200px" },
            backgroundColor: "#000000",
            borderRight: "1px solid #333",
            px: 2,
            py: 4,
            height: "100%",
            transition: "transform 0.3s ease",
            transform: menuOpen ? "translateX(  0%)" : "translateX(-100%)",
            zIndex: 1200,
          }}
        >
          <Sidebar />
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            px: 4,
            py: 4,
          }}
        >
          {children}
        </Box>

        {/* CartSidebar (right) */}
        <Box
          sx={{
            width: { xs: "100%", md: "200px" },
            backgroundColor: "#000000",
            borderLeft: "1px solid #333",
            px: 2,
            py: 4,
            height: "100%",
            ml: 0,
            position: "relative",
            transition: "transform 0.3s ease",
            transform: cartOpen ? "translateX(0)" : "translateX(100%)",
            zIndex: 1200,
          }}
        >
          <CartSidebar />
        </Box>
      </Box>
    </Box>
  );
}
