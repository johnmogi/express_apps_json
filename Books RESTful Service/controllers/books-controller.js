const express = require("express");
const booksLogic = require("../business-logic-layer/books-logic");
const BookModel = require("../models/book-model");

const router = express.Router();

// GET http://localhost:3000/api/books
router.get("/", async (request, response) => {
    try {
        const books = await booksLogic.getAllBooksAsync();
        response.json(books);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET http://localhost:3000/api/books/3
router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const book = await booksLogic.getOneBookAsync(id);
        response.json(book);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST http://localhost:3000/api/books
router.post("/", async (request, response) => {
    try {
        const book = request.body;

        // Validation: 
        const errors = BookModel.validate(book);
        if (errors) {
            response.status(400).send(errors);
            return;
        }

        const addedBook = await booksLogic.addBookAsync(book);
        response.status(201).json(addedBook);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT http://localhost:3000/api/books/3
router.put("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const book = request.body;
        book.id = id;
        const updatedBook = await booksLogic.updateBookAsync(book);
        if (!updatedBook) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedBook);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PATCH http://localhost:3000/api/books/3
router.patch("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const book = request.body;
        book.id = id;
        const updatedBook = await booksLogic.updateBookAsync(book);
        if (!updatedBook) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedBook);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE http://localhost:3000/api/books/3
router.delete("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        await booksLogic.deleteBookAsync(id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;