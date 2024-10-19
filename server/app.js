
const express = require("express");
const cors = require("cors");
const connect = require("./config/db"); 
const prodController = require("./controller/prod.controller");
const userController = require("./controller/user.controller"); 
const cartController = require("./controller/cart.controller"); 
const wishlistController = require("./controller/wishlist.controller"); 
const { authenticate } = require("./middlewares/authenticate"); 


const app = express();

// Middleware setup
app.use(cors());  // To handle cross-origin requests
app.use(express.json());  // To parse incoming JSON requests

// Environment variables and port setup
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Routes setup
app.use("/courses", prodController);  // Product related routes (for courses)
app.use("/join", userController);     // User related routes
app.use("/cart", cartController);     // Cart related routes
app.use("/wishlist", wishlistController);  // Wishlist related routes

app.post("/auth", authenticate, async (req, res) => {
  try {
    return res.status(200).send({ auth: true, user: req.user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
