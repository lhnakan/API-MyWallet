require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const usersController = require("./controllers/usersController");
// const transactionsController = require("./controllers/transactionsController");

// const authMiddleware = require("./middlewares/authMiddleware");

app.use(cors());
app.use(express.json());


app.post("/api/users/sign-in", usersController.postSignIn);
app.post("/api/users/sign-up", usersController.postSignUp);





const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});