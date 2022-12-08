const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

const booksPath = path.join(__dirname, 'books.json'); // ~/books/books.json

// console.log(booksPath);

async function saveToFile(books = []) {
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
}

async function getAll() {
    const books = await fs.readFile(booksPath, 'utf-8');

    return JSON.parse(books);
}

async function getById(bookId) {
    const books = await getAll();
    const book = books.find(({ id }) => id === bookId);

    if (!book) {
        throw new Error('Book not found');
    }

    return book;
}

async function create(title, author) {
    const books = await getAll();

    const book = {
        title,
        author,
        id: uuid(),
    };

    books.push(book);

    await saveToFile(books);

    return book;
}

async function update(title, author, bookId) {
    const books = await getAll();
    const index = books.findIndex(({ id }) => id === bookId);

    if (index === -1) {
        throw new Error('Book not found');
    }

    books[index].title = title;
    books[index].author = author;

    await saveToFile(books);

    return books[index];
}

async function deleteBook(bookId) {
    const books = await getAll();

    const index = books.findIndex(({ id }) => id === bookId);

    if (index === -1) {
        throw new Error('Book not found');
    }

    const [deletedBook] = books.splice(index, 1);

    await saveToFile(books);

    return deletedBook;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteBook,
};
