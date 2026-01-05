import express from "express";
import cors from "cors";

const app = express();

// Use Render's dynamic PORT or fallback
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send({ message: "Backend server running!" });
});

// Example endpoints
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  res.send({ message: `Registered ${email}` });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.send({ message: `Logged in ${email}` });
});

app.get("/product/:productName", (req, res) => {
  const { productName } = req.params;
  res.send({ product: productName, info: "Product info here" });
});

app.get("/scan", (req, res) => {
  res.send({ message: "Scan endpoint working!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
