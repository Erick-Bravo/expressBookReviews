let books = require("./router/booksdb.js");

const isbn = 2
const reviewInput = "This is a review";
const userSignedIn = "user12";

let book = books[isbn];
console.log(book);

if (book) {
  if (reviewInput) {
    book["reviews"][userSignedIn] = reviewInput
  }
}
books[isbn] = book
console.log(books[isbn]);
