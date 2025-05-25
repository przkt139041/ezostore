"use client";

import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { useCartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, removeFromCart } = useCartContext();
  const router = useRouter();

  const [form, setForm] = useState({
    address: "",
    postalCode: "",
    city: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [openDialog, setOpenDialog] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleCloseDialog = async () => {
    setOpenDialog(false);
    for (const item of cartItems) {
      await removeFromCart(item.product.id, item.quantity);
    }
    router.push("/");
  };

  return (
    <Box sx={{ px: 4, py: 6, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" sx={{ color: "#facc15", mb: 4 }}>
        🛍️ Kasa
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Adres"
            variant="outlined"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <TextField
            label="Kod pocztowy"
            variant="outlined"
            value={form.postalCode}
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
            required
          />
          <TextField
            label="Miasto"
            variant="outlined"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />
          <TextField
            label="Adres e-mail"
            variant="outlined"
            value={form.email}
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <Divider sx={{ my: 3, borderColor: "#444" }} />

          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            Wybierz metodę płatności:
          </Typography>

          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="bank"
              control={<Radio sx={{ color: "#facc15" }} />}
              label="Przelew bankowy"
            />
            <FormControlLabel
              value="monero"
              control={<Radio sx={{ color: "#facc15" }} />}
              label="Portfel Litecoin"
            />
          </RadioGroup>

          <Divider sx={{ my: 3, borderColor: "#444" }} />

          <Typography variant="h6" sx={{ color: "#4ade80" }}>
            🧾 Podsumowanie:
          </Typography>
          <ul>
            {cartItems.map(({ product, quantity }) => (
              <li key={product.id} style={{ color: "#ddd" }}>
                {quantity}x {product.name} – {product.price} zł
              </li>
            ))}
          </ul>

          <Typography sx={{ color: "#facc15", fontWeight: 700, mt: 2 }}>
            Razem: {total.toFixed(2)} zł
          </Typography>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#facc15",
              color: "#000",
              "&:hover": { backgroundColor: "#fde047" },
            }}
          >
            Złóż zamówienie
          </Button>
        </Stack>
      </form>

      {/* Dialog z informacją o płatności */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: "#facc15" }}>
          📦 Zamówienie złożone
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#eee", mb: 2 }}>
            Dziękujemy za złożenie zamówienia! 🪐 <br />
            Na opłacenie zamówienia masz <strong>24 godziny</strong>.<br />{" "}
            Szczegóły poniżej:
          </DialogContentText>

          {paymentMethod === "bank" ? (
            <DialogContentText sx={{ color: "#4ade80" }}>
              💸 <strong>Przelew bankowy:</strong> <br />
              Kwota: <strong>{total.toFixed(2)} zł</strong> <br />
              Numer konta: <strong>CH9300762011623852957</strong> <br />
              Tytuł przelewu:{" "}
              <strong>
                WPG-ZAMÓWIENIE-{(Math.random() * 1000000).toFixed()}
              </strong>
            </DialogContentText>
          ) : (
            <DialogContentText sx={{ color: "#4ade80" }}>
              🛸 <strong>Płatność Litecoin:</strong> <br />
              Kwota: <strong>{total.toFixed(2)} XMR</strong> <br />
              Adres portfela: <br />
              <code style={{ fontSize: "0.55rem" }}>
                888tNkZrPN6JsEgekjMnABU4TBzc2Dt29EPAvkRxbANsAnjyPbb3iQ1YBRk1UXcdRsiKc9dhwMVgN5S9cQUiyoogDavup3H
              </code>
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: "#facc15",
              color: "#000",
              "&:hover": { backgroundColor: "#fde047" },
              mx: 2,
              mb: 2,
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
