// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Layout from "@/components/Layout";
import { CartProvider } from "@/context/CartContext";
import { TokenProvider } from "@/context/TokenContext";

export const metadata: Metadata = {
  title: "Wszystkie Produkty Galaktyki",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <ThemeRegistry>
          <TokenProvider>
            <CartProvider>
              <Layout>{children}</Layout>
            </CartProvider>
          </TokenProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
