const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

const isValid = (username)=>{ //returns boolean
return users.find(user => user.username === username);
}

let users = [];
regd_users.post("/register", (req, res) => {
let {username, password} = req.body;
if (!username || !password) {
return res.status(400).json({message: "Please provide both username and password"});
}
if (isValid(username)) {
    return res.status(409).json({message: "Username already exists"});
}
users.push({username, password});
    return res.status(201).json({message: "User registered successfully"});
});


const authenticatedUser = (username,password)=>{ //returns boolean
    let user = users.find(user => user.username === username);
    return user && user.password === password;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 600000 });
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
  });

  // Add a book review
  regd_users.put("/auth/review/:isbn", (req, res) => {
    let {isbn} = req.params;
    let {review} = req.body;
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    if (!review) {
        return res.status(400).json({ message: "Please provide a review" });
    }
    if (!books[isbn].reviews) {
        books[isbn].reviews = [];
    }
    books[isbn].reviews[username] = review; // Add the review using the username as the key
    return res.status(200).json({message: "Review added successfully"});
  });


// Delete review 
regd_users.delete("/auth/review/:isbn/:reviewID", (req, res) => {
    const {isbn, reviewID} = req.params;

    if (!books[isbn]) {
        return res.status(404).send('Book not found');
    }
    if (!books[isbn].reviews) {
        return res.status(404).send('reviews not found');
    }

    const reviewIndex = books[isbn].reviews.findIndex(review => review.id === reviewID);
    if (reviewIndex === -1) {
        return res.status(404).send('Review not found');
    }

    if (req.session.username !== books[isbn].reviews[reviewIndex].username) {
        return res.status(401).send('You are not authorized to delete this review');
    }

    books[isbn].reviews = books[isbn].reviews.filter(review => review.id !== reviewID);
    res.send('Review deleted');
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;