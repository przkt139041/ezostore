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
import { useRouter } from "next/navigation";
import { addToCart } from "@/utils/cart-handler";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  return (
    <Card
      sx={{
        border: "4px solid #ec4899",
        backgroundColor: "#6b21a8",
        width: 250,
        height: 400,
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        },
      }}
      onClick={() => {
        router.push(`/produkt/${product.id}`);
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={`/pics/${product.image}`}
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
        <Button
          variant="contained"
          fullWidth
          onClick={async () => await addToCart(product.id)}
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
      </CardContent>
    </Card>
  );
};

export default ProductCard;
