require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Povolení konkrétní domény, například localhost:3000:
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Povolit požadavky pouze z této domény
  })
);

// Připojení user APIs
app.use("/api/users", require("./routes/userRoutes")); // Tento endpoint bude odpovídat na /api/users
// Připojení taskových APIs
app.use("/api/tasks", require("./routes/taskRoutes"));

// Připojení k MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB připojeno"))
  .catch((err) => console.error("Chyba připojení k MongoDB:", err));

// Testovací endpoint
app.get("/", (req, res) => {
  res.send("Server běží ...");
});

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});

console.log("MONGO_URI:", process.env.MONGO_URI);
