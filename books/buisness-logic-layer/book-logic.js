const fs = require("fs");

const fileName = "./data-access-layer/books.json"

function getAllBooksAsync() {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, books) => {
            if (err) {
                rejecFt(err);
                return
            }
            resolve(JSON.parse(books))
        })
    })
}
function saveAllBooksAsync(books) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, JSON.stringify(books, null, 4), err => {
            if (err) {
                rejecFt(err);
                return
            }
            resolve();
        })
    })
}
async function getOneBookAsync(id) {
    const books = await getAllBooksAsync();
    const oneBook = books.find(b => b.id === id);
    return oneBook;
}

async function addBookAsync(book) {
    const allBooks = await getAllBooksAsync();
    book.id = allBooks.length + 1
    allBooks.push(book)
    await saveAllBooksAsync(allBooks);
    return book;
}
async function updateBookAsync(book) {
    const allBooks = await getAllBooksAsync();
    const bookToUpdate = allBooks.find(b => b.id === book.id);
    if (!bookToUpdate) {
        return null;
    }
    for (const prop in book) {
        if (prop in bookToUpdate) {
            bookToUpdate[prop] = book[prop]
        }
    }
    await saveAllBooksAsync(allBooks)
    return bookToUpdate;
}

async function deleteBookAsync(id) {
    const allBooks = await getAllBooksAsync();
    const index = allBooks.findIndex(b => b.id === id);
    if (index >= 0) {
        allBooks.splice(index, 1);
        await saveAllBooksAsync(allBooks)
    }
}
module.exports = {
    getAllBooksAsync,
    saveAllBooksAsync,
    getOneBookAsync,
    addBookAsync,
    updateBookAsync,
    saveAllBooksAsync,
    deleteBookAsync
}