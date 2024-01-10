let books = require("./router/booksdb.js");

const id = 1;
if (id < 1 || id > 10) {
  console.log("Book not Found");
  return
}
console.log({reviews: books[id].reviews});
