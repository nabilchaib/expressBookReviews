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
public_users.get('/', function (req, res) {
    return new Promise(function (resolve, reject) {
      try {
        resolve(res.json(books));
      } catch (error) {
        reject(error);
      }
    });
  });
  

// Get book details based on ISBN
function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        let book = books[isbn];
        if (!book) {
            return reject({ message: "Book not found" });
        }
        resolve(book);
    });
}

public_users.get("/isbn/:isbn", function (req, res) {
    let isbn = req.params.isbn;
    getBookByISBN(isbn)
        .then(book => {
            res.json(book);
        })
        .catch(error => {
            res.status(404).json(error);
        });
});

  
// Get book details based on author
public_users.get('/author/:author', function(req, res) {
    let author = req.params.author;
    let found = false;
    let filtered_books = {};
  
    return new Promise((resolve, reject) => {
      Object.keys(books).forEach(function(key) {
        if (books[key].author === author) {
          filtered_books[key] = books[key];
          found = true;
        }
      });
      if (found) {
        resolve(res.status(200).json(filtered_books));
      } else {
        reject(res.status(404).json({ message: "Book not found" }));
      }
    });
  });
  
    
    // Get all books based on title
    public_users.get('/title/:title', function(req, res) {
        return new Promise((resolve, reject) => {
          let title = req.params.title;
          let matchingBooks = [];
          for (let key in books) {
            if (books[key].title.toLowerCase() === title.toLowerCase()) {
              matchingBooks.push(books[key]);
            }
          }
          if (matchingBooks.length === 0) {
            reject({ message: "No books found with the specified title", status: 404 });
          } else {
            resolve({ status: 200, data: matchingBooks });
          }
        })
        .then(result => res.status(result.status).json(result.data))
        .catch(error => res.status(error.status).json({ message: error.message }));
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
