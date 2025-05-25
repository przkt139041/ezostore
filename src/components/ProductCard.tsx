"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Product } from "@/types";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart, loading } = useCartContext();

  return (
    <Card
      sx={{
        border: "4px solid #ec4899",
        backgroundColor: "#6b21a8",
        width: 250,
        height: 430,
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        },
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => {
        router.push(`/produkt/${product.id}`);
      }}
    >
      <CardMedia
        component="img"
        height="200"
        width="100%"
        image={
          product.image.includes("https")
            ? product.image
            : `/pics/${product.image}`
        }
        alt={product.name}
        sx={{
          border: "2px solid #facc15",
          width: "100%",
          height: 250,
          objectFit: "cover",
          objectPosition: "center",
          backgroundColor: "#fff",
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          p: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            {product.name}
          </Typography>
          <Typography sx={{ color: "#facc15" }}>{product.price} zł</Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={async (e) => {
            e.stopPropagation(); // Prevent card click event
            await addToCart(product.id);
          }}
          sx={{
            mt: 2,
            backgroundColor: "#facc15",
            color: "#000",
            "&:hover": {
              backgroundColor: "#fde047",
            },
            zIndex: 10,
          }}
          loading={loading}
        >
          Do koszyka
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
