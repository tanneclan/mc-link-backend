const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Speicher (nur simpel im RAM)
const codes = {};

// Code erstellen
app.post("/create-code", (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ error: "Kein Name" });
  }

  const code = Math.floor(1000 + Math.random() * 9000).toString();

  codes[name] = code;

  res.json({ code });
});

// Code prüfen (für Minecraft später)
app.post("/verify-code", (req, res) => {
  const { name, code } = req.body;

  if (codes[name] && codes[name] === code) {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// Test
app.get("/", (req, res) => {
  res.send("MC Link Backend läuft");
});

app.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});
