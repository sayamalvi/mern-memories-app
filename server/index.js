import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

// limit controls the maximum request body size
// extended creates an object from the form input 
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

// cors allows you to make requests from one website to another in the browser
app.use(cors());

// router in itself is a middleware so we have used app.use
// for the first parameter set the starting path for all the routes inside posts.js, in the second parameter we have set the routes
// it means that postRoutes will start from localhost:5000/posts instead of localhost:500 because we have added prefix of posts to all the routes in posts.js
app.use('/posts', postRoutes);

// setup mongodb 
const connectionURL = "mongodb+srv://Sayam:sayamAlvi@cluster0.chzyy2x.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// returns a promise 
mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));


