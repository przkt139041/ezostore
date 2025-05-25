// src/theme/ThemeRegistry.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "@/theme/theme";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "*::-webkit-scrollbar": {
            width: "12px",
            height: "12px",
          },
          "*::-webkit-scrollbar-track": {
            backgroundColor: "#1a1a1a",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#555",
            borderRadius: "6px",
            border: "3px solid #1a1a1a",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#777",
          },
          body: {
            scrollbarColor: "#555 #1a1a1a", // Firefox support
            scrollbarWidth: "thin",
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
