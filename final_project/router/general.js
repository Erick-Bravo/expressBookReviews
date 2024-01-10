const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  let userWithSameName = users.filter((user) => {
    return user.username === username;
  });

  if (userWithSameName.length > 0) {
    return true;
  } else {
    return false;
  }
};

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ user: username, password: password });
      return res
        .status(200)
        .json({ message: "Register successfull. Please Login" });
    } else {
      return res.status(404).json({ message: "User already exists" });
    }
  }
  return res.status(404).json({ message: "Unable to register" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books, null, 1));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const id = req.params.isbn;
  if (id < 1 || id > 10) {
    return res.status(404).send("Book not found");
  }
  return res.status(200).send(JSON.stringify(books[id], null, 1));
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookFound = [];
  for (const id in books) {
    if (author === books[id].author) {
      bookFound.push(books[id]);
    }
  }
  if (bookFound.length > 0) {
    return res.status(200).send(JSON.stringify(bookFound[0]));
  }
  return res.status(404).json({ message: "Book Not Found" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookFound = [];
  for (const id in books) {
    if (title === books[id].title) {
      bookFound.push(books[id]);
    }
  }
  if (bookFound.length > 0) {
    return res.status(200).send(JSON.stringify(bookFound[0]));
  }
  return res.status(404).json({ message: "Book Not Found" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const id = req.params.isbn;
  if (id < 1 || id > 10) {
    return res.status(404).send("Book not found");
  }
  return res
    .status(200)
    .send(JSON.stringify({ reviews: books[id].reviews }, null, 1));
});

module.exports.general = public_users;
