const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// CORS
const corsOptions = {
  origin: `http://localhost:${PORT}`,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.get("/documentation", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "documentation.html"));
});

// Start
app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
});
