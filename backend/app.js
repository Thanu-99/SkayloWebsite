CDATASection.apply.applyimport express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send({ message: "Backend server running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
