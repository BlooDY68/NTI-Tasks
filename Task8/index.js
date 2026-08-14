const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3000;
const booksPath = path.join(__dirname, "books.json");
function readBooks() {
    if (!fs.existsSync(booksPath)) return [];
    const data = fs.readFileSync(booksPath, "utf-8");
    return JSON.parse(data || "[]");
}
function saveBooks(books) {
    fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
}
const server = http.createServer((req, res) => {
    const { method, url } = req;
    const sendJSON = (statusCode, payload) => {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(payload));
    };
    if (method === "GET" && url === "/books") {
        const books = readBooks();
        return sendJSON(200, { status: "success", data: books });
    }
    if (method === "POST" && url === "/books") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            try {
                const newBookData = JSON.parse(body);
                const books = readBooks();
                const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
                const newBook = {
                    id: newId,
                    title: newBookData.title,
                    author: newBookData.author,
                    price: newBookData.price,
                    available: newBookData.available ?? true
                };
                books.push(newBook);
                saveBooks(books);
                return sendJSON(201, { status: "success", message: "Book created", data: newBook });
            } catch (err) {
                return sendJSON(400, { status: "error", message: "Invalid JSON format" });
            }
        });
        return;
    }
    if (method === "DELETE" && url.startsWith("/books/")) {
        const id = parseInt(url.split("/")[2]);
        let books = readBooks();
        const bookIndex = books.findIndex(b => b.id === id);
        if (bookIndex === -1) {
            return sendJSON(404, { status: "error", message: "Book not found" });
        }
        const deletedBook = books.splice(bookIndex, 1)[0];
        saveBooks(books);
        return sendJSON(200, { status: "success", message: "Book deleted", data: deletedBook });
    }
    return sendJSON(404, { status: "error", message: "Route not found" });
});
if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`HTTP Server running at http://localhost:${PORT}`);
    });
}
module.exports = server;
