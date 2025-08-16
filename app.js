import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/chapter", (req, res) => {
  res.render("chapter");
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// app.js
