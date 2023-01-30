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
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/books')
        .then(response => {
            res.json(response.data);
            resolve();
        })
        .catch(error => {
            res.status(404).json({message: "Books not found"});
            reject(error);
        });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/books/${isbn}`)
        .then(response => {
            res.json(response.data);
            resolve();
        })
        .catch(error => {
            res.status(404).json({message: "Book not found"});
            reject(error);
        });
    });
});
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/books?author=${author}`)
        .then(response => {
            res.json(response.data);
            resolve();
        })
        .catch(error => {
            res.status(404).json({message: "Book not found"});
            reject(error);
        });
    });
});    
    // Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/books?title=${title}`)
        .then(response => {
            res.json(response.data);
            resolve();
        })
        .catch(error => {
            res.status(404).json({ message: "No books found with the specified title" });
            reject(error);
        });
    });
});
    
    // Get book review
    public_users.get('/review/:isbn',function (req, res) {
        let isbn = req.params.isbn;
        let review = books[isbn].reviews;
        if(review) {
        return res.status(200).json({review});
        } else {
        return res.status(404).json({message: "No reviews found for ISBN"});
        }
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
