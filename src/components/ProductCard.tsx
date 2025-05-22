"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Product } from "@/types";
import { FC } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card
      sx={{
        border: "4px solid #ec4899",
        backgroundColor: "#6b21a8",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{
          border: "2px solid #facc15",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          {product.name}
        </Typography>
        <Typography sx={{ color: "#facc15" }}>{product.price} zł</Typography>
        {onAddToCart && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => onAddToCart(product)}
            sx={{
              mt: 2,
              backgroundColor: "#facc15",
              color: "#000",
              "&:hover": {
                backgroundColor: "#fde047",
              },
            }}
          >
            Do koszyka
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
