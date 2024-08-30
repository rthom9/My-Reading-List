import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

// Middleware necessary to parse request body
app.use(express.json());

app.use(cors());

// Allow custom origins
// app.use(
//     cors({
//         origin: "http://localhost:5544",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Conent-Type"]
//     })
// )

app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send('Wilkommen!');
});

// For each request to books, handle with booksRoutes middleware
app.use("/books", booksRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log("Connected to database.")
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
    }).catch((error) =>{
        console.log(error);
    })

