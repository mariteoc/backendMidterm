const router = require('express').Router();
let coll = require('./model/book.model');

router.get("/",async (req, res) => {
    try{
        const books = await getBooks();
        console.log(books);
  res.json({books});
    }catch(error){
        console.error("Error retrieving books: ", error);
        res.status(500).json({error:"Error retrieving books"});
    }
  
});

router.get("/:id", async (req, res) => {
  let bookId = req.params.id;
  try{
    const book = await getBookbyId(bookId);
      res.json({book});
    }
    catch(error){
        console.log(error);
    }
});

router.post("/", async (req, res) => {
  let bookTitle = req.body.title;
  let bookAuthor = req.body.author;
  let bookDescription = req.body.description;

  try{
    let newBook = await addBook(bookTitle, bookAuthor, bookDescription);
    res.json({newBook});
  }
  catch(error){
    console.log(error);
  }
  
  
});

router.put("/:id", async (req, res) => {

  let bookId = req.params.id;
  let bookTitle = req.body.title;
  let bookAuthor = req.body.author;
  let bookDescription = req.body.description;
  try{
    const bookModified = await updateBook(bookId, bookTitle, bookAuthor, bookDescription);
    res.json(bookModified);
  }
  catch(error){
    console.log(error);
  }

});

router.delete("/:id", async (req, res) => {
  let bookId = req.params.id;
  try{
    const deletedBook = await deleteBook(bookId);
    res.json(deletedBook);
  }
  catch(error){
    console.error(error);
  }
 
});

async function getBooks() {
  try {
    const books = await coll.find({}).exec();
    return books;
  } catch (error) {
    console.error("Error retrieve books: ", error);
  }
}

async function getBookbyId(id) {
  try {
    const book = await coll.find({_id: id}).exec();
    return book;
  } catch (error) {
    console.error("Error retrieve book: ", error);
  }
}

async function addBook(bookTitle, bookAuthor, bookDescription) {
  try {
    const newBook = new coll({
      title: bookTitle,
      author: bookAuthor,
      description: bookDescription,
    });

    await coll.create(newBook);
    return newBook;
    }
  catch (error) {
    console.error(error);
  }
}

async function updateBook(bookId, bookTitle, bookAuthor, bookDescription) {
  try {
    const updatedBook = await coll.findOneAndUpdate({
      _id: bookId},{
      title: bookTitle,
      author: bookAuthor,
      description: bookDescription,
    },{new: true});
    return updatedBook;
  } catch (error) {
    console.log(error);
  }
}

async function deleteBook(bookId) {
  try {
    const book = await coll.deleteOne({ _id: bookId });
    return book;
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;