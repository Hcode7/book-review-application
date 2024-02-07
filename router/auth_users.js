const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const JWT_SECRET = 'verysecretcode'

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username
  const password = req.body.password

  if (!isValid) {
    return res.status(400).json('Invalid username')
  }
  if (!authenticatedUser(username,password)) {
    return res.status(401).json('Username or password is not requird')
  }
  const user = {name:username, pwd:password}

  const token = jsonwebtoken.sign(user,JWT_SECRET)
  
  users.push({username,token})
  
  res.json({token})

  // return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const username = req.body.username
  const password = req.body.password
  const reviewText = req.body.review
  // username
  const users = users.find((u=> u.username === username))
  if (!users) {
    return res.status(401).json('Invalid username')
  }
  const book = books.find((b)=> b.isbn === isbn)
  if (!book) {
    return res.status(404).json('Book not found')
  }
  // Check if the user already has a review for this book
  const reviewIndex = findReviewIndex(book.reviews, username);

  if (reviewIndex !== -1) {
  // Modify existing review
      book.reviews[reviewIndex].text = reviewText;
  } else {
  // Add a new review
    book.reviews.push({ username, text: reviewText });
}

return res.status(200).json({ message: 'Review added/modified successfully' });
  // return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete('/auth/review/:isbn', (req, res) => {
  const username = req.body.username;
  const isbn = req.params.isbn;  // Use req.params to get ISBN from the URL
  const reviewText = req.query.review;

  // Check if the username is valid
  if (!username) {
    return res.status(401).json({ message: 'Username is not valid' });
  }

  // Find the user
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  // Find the book
  const book = books.find((b) => b.isbn === isbn);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Check if the user has a review for this book
  const reviewIndex = findReviewIndex(book.reviews, username);

  if (reviewIndex !== -1) {
    // Delete existing review
    book.reviews.splice(reviewIndex, 1);
    return res.status(200).json({ message: 'Review deleted successfully' });
  } else {
    return res.status(404).json({ message: 'Review not found' });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
