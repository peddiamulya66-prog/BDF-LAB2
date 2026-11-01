
# BDF Lab 2 - Book Management API

## Project Description
This project is a Book Management REST API developed using Node.js, Express.js and SQLite.

It performs CRUD operations to manage book records.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- Postman

## Database Details

Database Name: database.db

Table Name: book

### Table Columns
| Column | Data Type |
|---|---|
| id | INTEGER PRIMARY KEY |
| title | TEXT |
| author | TEXT |
| price | INTEGER |
| pages | INTEGER |

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | /books/ | Get all books |
| GET | /books/:bookId/ | Get book by ID |
| POST | /books/ | Add a new book |
| PUT | /books/:bookId/ | Update book |
| DELETE | /books/:bookId/ | Delete book |

## How to Run the Project

1. Install Node.js.
2. Open the project folder in VS Code.
3. Run npm install.
4. Run npm run dev.
5. Server starts at http://localhost:3000.

## API Testing

All API operations are tested using Postman.

## Project Status
Completed - CRUD operations implemented.

