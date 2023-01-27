const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.json(books);
    });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    let book = books[isbn];
    if(!book) {
    return res.status(404).json({message: "Book not found"});
    }
    res.json(book);
    });
  
// Get book details based on author
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    let found = false;
    let filtered_books = {}
    Object.keys(books).forEach(function(key) {
    if (books[key].author === author) {
    filtered_books[key] = books[key];
    found = true;
    }
    });
    if(found){
    return res.status(200).json(filtered_books);
    }
    else{
    return res.status(404).json({message: "Book not found"});
    }
    });
    
    // Get all books based on title
    public_users.get('/title/:title',function (req, res) {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
    });
    
    // Get book review
    public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
    });
    
    module.exports.general = public_users;
    
    //To test this code on postman, send a GET request to the endpoint '/author/{author_name}'
    //For example '/author/Jane Austen' to get all books written by Jane Austen.
    
    
    
    
    

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
