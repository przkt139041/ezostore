// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Layout from "@/components/Layout";

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
          {" "}
          <Layout>{children} </Layout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
