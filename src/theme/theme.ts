// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e91e63", // pink
    },
    background: {
      default: "#000000",
      paper: "#1a1a1a",
    },
  },
  typography: {
    fontFamily: `'Courier New', monospace`,
  },
});

export default theme;
