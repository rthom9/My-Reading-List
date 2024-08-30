import express from "express";
import { Book } from "../models/bookModel.js"

const router = express.Router();

// Route for saving new read book entry
router.post("/", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.readDate) {
            return response.status(400).send({
                message: "Include all required fields: title, author, readDate."
            });
        }
        
        console.log(response.body)
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            readDate: request.body.readDate,
            imgUrl: request.body.imgUrl,
            summary: request.body.summary,
            rating: request.body.rating
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Get all books
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Get a specific book from database by id
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json({
            book
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route to update a book
router.put("/:id", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.readDate) {
            return response.status(400).send({
                message: "Include all required fields: title, author, readDate."
            });
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Book not found."})
        }
        return response.status(200).json({ message: "Book updated."})
    } catch (error) {
        console.log(error.message)
        response.send(500).send({ message: error.message })
    }
})

// Route to delete a book
router.delete("/:id", async (request, response) => {
    try {
       const { id } = request.params;
       console.log(request)
       const result = await Book.findByIdAndDelete(id); 
       if (!result) {
        return response.status(404).json({ message: "Book not found."})
       }
       return response.status(200).send({ message: "Book deleted successfully."})
    } catch (error) {
        console.log(error.message);
        response.status(500).send( {message: error.message})
    }
})

// Route to delete all entreis
router.delete("/", async(request, response) => {
    try {
        await Book.deleteMany({}); // This deletes all documents in the collection
        response.status(200).send({ message: 'All book collections deleted successfully' });
      } catch (error) {
        response.status(500).send({ error: 'Failed to delete book collections' })
        }
    });
    


export default router;