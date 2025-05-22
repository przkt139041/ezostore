"use client";

import { Divider, List, Typography } from "@mui/material";

const products = [
  { name: "Product1", count: 1, unit: "szt" },
  { name: "Product2", count: 7, unit: "op" },
  { name: "Product3", count: 2, unit: "g" },
];

export default function CartSidebar() {
  return (
    <>
      <Typography
        variant="h6"
        sx={{ color: "#facc15", mb: 2, fontWeight: 600 }}
      >
        Koszyk
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "#333" }} />
      <List>
        {products.map((product) => (
          <li
            key={product.name}
            style={{ listStyle: "none", marginBottom: 12 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#4ade80",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#fde047",
                },
              }}
            >
              <span style={{ flex: 1 }}>{product.name}</span>
              <span style={{ fontWeight: 400, opacity: 0.8 }}>
                {product.count} {product.unit}
              </span>
            </Typography>
          </li>
        ))}
      </List>
    </>
  );
}
