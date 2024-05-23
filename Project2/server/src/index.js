const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const UserModel = require('./models/Users'); // Import the UserModel
const userRouter = require('./routes/users')
const recipeRouter = require('./routes/recipes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);
app.use('/recipes', recipeRouter);


mongoose.connect('mongodb+srv://harshshinde70:etOgkiQHPkT2GWhE@recipes.whhj0k6.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes')
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("Server started");
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
