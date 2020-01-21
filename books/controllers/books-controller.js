const express = require("express");
const booksLogic = require("../buisness-logic-layer/book-logic")
const BookModel = require("../models/book-models")

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const books = await booksLogic.getAllBooksAsync();
        response.json(books)
    }
    catch (err) {
        response.status(500).send(err.message)
    }

});


router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id
        const book = await booksLogic.getOneBookAsync(id);
        console.log(book)
        response.json(book)
    }
    catch (err) {
        response.status(500).send(err.message)
    }

});


router.post("/", async (request, response) => {
    try {

        const book = request.body;
        //validation

        const errors = BookModel.validate(book)
        if (errors) {
            response.status(400).send(errors);
            return
        }
        const addedBook = await booksLogic.addBookAsync(book);
        // console.log(book)
        response.status(201).json(addedBook)
    }
    catch (err) {
        response.status(500).send(err.message)
    }

});


router.put("/:id", async (request, response) => {
    try {
        const id = +request.params.id
        const book = request.body;

        book.id = id;
        const updatedBook = await booksLogic.updateBookAsync(book);

        if (!updatedBook) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedBook)
    }
    catch (err) {
        response.status(500).send(err.message)
    }

});

router.delete("/:id", async (request, response) => {
    try {
        const id = +request.params.id
        await booksLogic.deleteBookAsync(id);


        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message)
    }

});

// router.patch("/:id", async (request, response) => {
//     try {
//         const id = +request.params.id
//         const book = request.body;

//         book.id = id;
//         const updatedBook = await booksLogic.updateBookAsync(book);

//         if (!updatedBook) {
//             response.sendStatus(404);
//             return;
//         }
//         response.json(updatedBook)
//     }
//     catch (err) {
//         response.status(500).send(err.message)
//     }

// });

module.exports = router;