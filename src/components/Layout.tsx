"use client";

import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CartSidebar from "./CartSidebar";
import { useEffect, useState } from "react";
import { useCartContext } from "@/context/CartContext";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartItems } = useCartContext();

  useEffect(() => {
    setCartOpen(true);
  }, [cartItems]);

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: `'Courier New', monospace`,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // 🔄 ZAMIANA z height → minHeight
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
            top: 0,
            alignSelf: "flex-start",
            height: "90vh",
            position: "sticky",
            transition: "transform 0.3s ease",
            transform: menuOpen ? "translateX(  0%)" : "translateX(-100%)",
            zIndex: 1199,
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
            width: { xs: "100%", md: "300px" },
            backgroundColor: "#000000",
            borderLeft: "1px solid #333",
            px: 2,
            py: 4,
            position: "sticky", // 🔥
            top: 0,
            alignSelf: "flex-start",
            height: "90vh",
            flexDirection: "column", // konieczne!
            transition: "transform 0.3s ease",
            transform: cartOpen ? "translateX(0)" : "translateX(100%)",
            zIndex: 1199,
          }}
        >
          <CartSidebar />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
