const express = require("express");
const db = require("./database");

const app = express();

app.use(express.json());

const port = 3000;

let database;

// 1. GET: Get all books
app.get("/books/", async (request, response) => {
    const query = `
    SELECT * FROM book;
  `;

    const books = await database.all(query);
    response.status(200).send(books);
});

// 2. GET: Get a book by ID
app.get("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const query = `
    SELECT * FROM book
    WHERE id = ?;
  `;

    const book = await database.get(query, [bookId]);

    if (book === undefined) {
        response.status(404).send("Book Not Found");
    } else {
        response.status(200).send(book);
    }
});

// 3. POST: Add a new book
app.post("/books/", async (request, response) => {
    const { title, author, price, pages } = request.body;

    if (!title || !author || price == null || pages == null) {
        return response.status(400).send("All book details are required");
    }

    const query = `
    INSERT INTO book (title, author, price, pages)
    VALUES (?, ?, ?, ?);
  `;

    await database.run(query, [title, author, price, pages]);

    response.status(201).send("Book Added Successfully");
});

// 4. PUT: Update a book
app.put("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    if (!title || !author || price == null || pages == null) {
        return response.status(400).send("All book details are required");
    }

    const query = `
    UPDATE book
    SET title = ?, author = ?, price = ?, pages = ?
    WHERE id = ?;
  `;

    const result = await database.run(query, [
        title,
        author,
        price,
        pages,
        bookId
    ]);

    if (result.changes === 0) {
        response.status(404).send("Book Not Found");
    } else {
        response.status(200).send("Book Updated Successfully");
    }
});

// 5. DELETE: Delete a book
app.delete("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const query = `
    DELETE FROM book
    WHERE id = ?;
  `;

    const result = await database.run(query, [bookId]);

    if (result.changes === 0) {
        response.status(404).send("Book Not Found");
    } else {
        response.status(200).send("Book Deleted Successfully");
    }
});

// Initialize database and start server
const initializeDBAndServer = async () => {
    try {
        database = await db;

        console.log("Database connected successfully");

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });

    } catch (error) {
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer().then(() => {
    console.log("Initialization completed");
});
