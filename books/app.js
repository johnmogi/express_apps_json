// const booksLogic = require("./buisness-logic-layer/book-logic")

// async function main() { 
// try{
//     const books = await booksLogic.getAllBooksAsync();
//     books[0].price++
//     await booksLogic.saveAllBooksAsync(books)
// }
// catch(err){ 
//     console.log(err)  
// }
// }
// main();

const express = require("express");
const booksController = require("./controllers/books-controller");

const server = express();

server.use(express.json());
server.use("/api/books", booksController)

server.listen(3000, () => console.log("Listening on http://localhost:3000"))