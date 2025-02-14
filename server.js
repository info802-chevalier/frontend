const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// Cors
app.use(cors());

// Routes
app.get("/documentation", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "documentation.html"));
});

// Start
app.listen(PORT, () => {
  console.log(`Frontend running at on port ${PORT}`);
});
