"use client";

import { Box, Divider, List, Typography } from "@mui/material";

const categories = ["Kamienie", "Kadzidełka", "Talizmany"];

export default function Sidebar() {
  return (
    <>
      <Typography
        variant="h6"
        sx={{ color: "#facc15", mb: 2, fontWeight: 600 }}
      >
        Kategorie
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "#333" }} />
      <Box sx={{ justifyContent: "space-between" }}>
        <List>
          {categories.map((cat) => (
            <Typography
              key={cat}
              variant="body1"
              sx={{
                color: "#4ade80",
                mb: 1,
                fontWeight: 400,
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
            >
              {cat}
            </Typography>
          ))}
        </List>
        {/* <Box
          component={"img"}
          src="/assets/GWARANCJABEZPIECZNYCHZAKUPOW.jpg"
          alt=""
          sx={{
            width: "90%",
            bottom: 0,
            left: 0,
            position: "absolute",
          }}
        /> */}
      </Box>
    </>
  );
}
