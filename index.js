require("dotenv").config();


const { request, response } = require("express");

//FrameWork
const express=require("express");
const mongoose=require("mongoose");

//Database
const database=require("./database/database");

//Models
const BookModel=require("./database/book");
const AuthorModel=require("./database/author");
const PublicationModel=require("./database/publication");

//Initialisation
const booky=express();

//configuration
booky.use(express.json());

//Establish DataBase Connection
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>console.log("connection established!!!!!!!!"));

/* 
Route       : /
Description :Get all the books
Access      :PUBLIC
Parameter   :None
Methods     :GET
*/
booky.get("/",async (request,response)=>{
    const getAllBooks=await BookModel.find();
    return response.json({books:getAllBooks});

});

/* 
Route       : /is
Description :Get Specific book based on isbn
Access      :PUBLIC
Parameter   :isbn
Methods     :GET
*/
booky.get("/is/:isbn",async (request,response)=>{
    
   const getSpecificBook=await BookModel.findOne({ISBN:request.params.isbn})
   /*
   const getSpecificBook=database.books.filter((book)=>
     book.ISBN===request.params.isbn
   );
   */
  //null=>false
   if(!getSpecificBook){
       return response.json({error:`No Book Found for the isbn ${request.params.isbn}`});
   }
   return response.json({book:getSpecificBook});
});

/* 
Route       : /c
Description :Get Specific book based on category
Access      :PUBLIC
Parameter   :category
Methods     :GET
*/
booky.get("/c/:category",async (request,response)=>{
    const getSpecificBook=await BookModel.findOne({category:request.params.category});

    //const getSpecificBook=database.books.filter((book)=>
    //   book.category.includes(request.params.category)
    //);
    if(!getSpecificBook){
        return response.json({error:`No Book Found for the category of ${request.params.category}`,});
    }
    return response.json({book:getSpecificBook});
 });

 /* 
Route       : /l
Description :Get Specific book based on languages
Access      :PUBLIC
Parameter   :language
Methods     :GET
*/
booky.get("/l/:language",async (request,response)=>{

    const getSpecificBook=await BookModel.findOne({language:request.params.language});

    //const getSpecificBook=database.books.filter((book)=>
    //    book.language.includes(request.params.language)
    //);
    if(!getSpecificBook){
        return response.json({error:`No Book Found for the category of ${request.params.language}`,});
    }
    return response.json({book:getSpecificBook});
 });

/* 
Route       : /author
Description :Get all the authors
Access      :PUBLIC
Parameter   :none
Methods     :GET
*/
booky.get("/author",async (request,response)=>{
    const getAllauthors=await AuthorModel.find();
    return response.json({authors:getAllauthors});
});

/* 
Route       : /author
Description :Get Specific Author based on id
Access      :PUBLIC
Parameter   :id
Methods     :GET
*/
booky.get("/author/:id",async (request,response)=>{

    const getSpecificAuthor=await AuthorModel.findOne({id:parseInt(request.params.id)});
    //const getSpecificAuthor=database.author.filter((author)=>
    //    author.id===parseInt(request.params.id)
    //);
    if(!getSpecificAuthor){
        return response.json({error:`No Author Found with id of ${request.params.id}`,});
    }
    return response.json({author:getSpecificAuthor});
 });

 /* 
Route       : /author/book
Description :Get All Author based on books
Access      :PUBLIC
Parameter   :isbn
Methods     :GET
*/
booky.get("/author/book/:isbn",async(request,response)=>{
    const getAuthor=await AuthorModel.findOne({books:request.params.isbn})
    //const getAuthor=database.author.filter((author)=>
    //    author.books.includes(request.params.isbn)
    //);
    if(!getAuthor){
        return response.json({error:`No Author Found for the book with isbn of ${request.params.isbn}`,});
    }
    return response.json({author:getAuthor});
 });

 /* 
Route       : /publication
Description :Get all the publications
Access      :PUBLIC
Parameter   :none
Methods     :GET
*/
booky.get("/publication",async (request,response)=>{
    const getAllPublications=await PublicationModel.find();
    return response.json({publication:getAllPublications});
});

/* 
Route       : /publication
Description :Get Specific publication based on id
Access      :PUBLIC
Parameter   :id
Methods     :GET
*/
booky.get("/publication/:id",async (request,response)=>{
    const getSpecificPublication=await PublicationModel.findOne({id:parseInt(request.params.id)});
    //const getSpecificPublication=database.publication.filter((publication)=>
    //publication.id===parseInt(request.params.id)
    //);
    if(!getSpecificPublication){
        return response.json({error:`No publication Found with id of ${request.params.id}`,});
    }
    return response.json({publication:getSpecificPublication});
 });

 /* 
Route       : /publication/book
Description :Get All publication based on books
Access      :PUBLIC
Parameter   :isbn
Methods     :GET
*/
booky.get("/publication/book/:isbn",async (request,response)=>{

    const getAllPublication=await PublicationModel.findOne({books:request.params.isbn});
    //const getAllPublication=database.author.filter((publication)=>
    //publication.books.includes(request.params.isbn)
    //);
    if(!getAllPublication){
        return response.json({error:`No publication Found for the book with isbn of ${request.params.isbn}`,});
    }
    return response.json({Publication:getAllPublication});
 });

/* 
Route       : /book/add
Description :Adding a New book
Access      :PUBLIC
Parameter   :none
Methods     :POST
*/
booky.post("/book/add",async (request,response)=>{
    const {newBook}=request.body;

    const addNewBook=BookModel.create(newBook);

    return response.json({Books:addNewBook});
});

/* 
Route       : /author/add
Description :Adding new author
Access      :PUBLIC
Parameter   :none
Methods     :POST
*/
booky.post("/author/add",(request,response)=>{
    const {newAuthor}=request.body;
    const addNewAuthor=AuthorModel.create(newAuthor);
    return response.json({authors:addNewAuthor});
});

/* 
Route       : /publication/add
Description :Adding new publication
Access      :PUBLIC
Parameter   :none
Methods     :POST
*/
booky.post("/publication/add",(request,response)=>{
    const {newPublication}=request.body;
    const addNewPublication=PublicationModel.create(newPublication);
    return response.json({publications:addNewPublication});
});

/* 
Route       : /book/update/title
Description :Updating new book
Access      :PUBLIC
Parameter   :isbn
Methods     :PUT
*/
booky.put("/book/update/title/:isbn",async(request,response)=>{
    const updatedBook=await BookModel.findOneAndUpdate(
        {
            ISBN:request.params.isbn
        },
        {
            title:request.body.newBookTitle
        },
        {
            new:true,
        }
        );
    //database.books.forEach((book)=>{
     //   if(book.ISBN===request.params.isbn){
     //       book.title=request.body.newBookTitle;
     //       return;
     //   }
    //});
    return response.json({books:updatedBook});
});

/* 
Route       : /book/update/author
Description :Update or add authors for a book
Access      :PUBLIC
Parameter   :isbn
Methods     :PUT
*/
booky.put("/book/update/author/:isbn/:authorId",(request,response)=>{
    //Updating book database
    database.books.forEach((book)=>{
        if(book.ISBN===request.params.isbn){
            return book.author.push(parseInt(request.params.authorId));
        }
    });

    ////Updating author database
    database.author.forEach((author)=>{
        if(author.id===parseInt(request.params.authorId)){
            return author.books.push(request.params.isbn);
        }
    });

    return response.json({books:database.books,authors:database.author});
});

/* 
Route       :/author/update/name
Description :Update author name for a particular id
Access      :PUBLIC
Parameter   :id
Methods     :PUT
*/
booky.put("/author/update/name/:id",(request,response)=>{
    //Updating author database
    database.author.forEach((author)=>{
        if(author.id===parseInt(request.params.id)){
            author.name=request.body.newName;
            return;
        }
    });
   return response.json({authors:database.author});
});

/* 
Route       :/publication/update/name
Description :Update publication name for a particular id
Access      :PUBLIC
Parameter   :id
Methods     :PUT
*/
booky.put("/publication/update/name/:id",(request,response)=>{
    //Updating publication database
    database.publication.forEach((publication)=>{
        if(publication.id===parseInt(request.params.id)){
            publication.name=request.body.newName;
            return;
        }
    });
   return response.json({publications:database.publication});
});

/* 
Route       :/publication/update/book
Description :Update/Add new books to publications
Access      :PUBLIC
Parameter   :isbn
Methods     :PUT
*/
booky.put("/publication/update/book/:isbn",(request,response)=>{
    //Updating publication database
    database.publication.forEach((publication)=>{
        if(publication.id===request.body.pubId){
            return publication.books.push(request.params.isbn);
        }
    });
  //Updating book database
  database.books.forEach((book)=>{
    if(book.ISBN===request.params.isbn){
       return book.publication.push(request.body.pubId);
    }
});

   return response.json({books:database.books,publications:database.publication,message:"Successfully updated books to publication"});
});

/* 
Route       :/book/delete
Description :Delete a book
Access      :PUBLIC
Parameter   :isbn
Methods     :DELETE
*/
booky.delete("/book/delete/:isbn",(request,response)=>{
    //update book database
    const updatedBookDatabase=database.books.filter((book)=>book.ISBN!=request.params.isbn);
    database.books=updatedBookDatabase;
    return response.json({books:database.books,message:"Successfully updated books After deleting a particular book"});
});

/* 
Route       :/book/delete/author
Description :Delete an author from a book
Access      :PUBLIC
Parameter   :isbn,authorId
Methods     :DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId",(request,response)=>{
   //update book database
   database.books.forEach((book)=>{
     if(book.ISBN===request.params.isbn){
        const newAuthorList=book.author.filter((author)=>
            author!==parseInt(request.params.authorId)
        );
        book.author=newAuthorList;
        return;
     }
   });

   //update author database
   database.author.forEach((author)=>{
    if(author.id===parseInt(request.params.authorId)){
       const newBookList=author.books.filter((book)=>
           book!==request.params.isbn
       );
       author.books=newBookList;
       return;
    }
  });
  return response.json({books:database.books,authors:database.author,message:"Successfully updated books and authors After deleting a particular Author"});
});

/* 
Route       :/author/delete
Description :Delete an author 
Access      :PUBLIC
Parameter   :authorId
Methods     :DELETE
*/
booky.delete("/author/delete/:authorID",(request,response)=>{
    const newAuthorList=database.author.filter((author)=>author.id!==parseInt(request.params.authorID));
    database.author=newAuthorList;
    return response.json({authors:database.author,message:"Successfully updated authors After deleting a particular Author"});
});

/* 
Route       :/publication/delete/book
Description :Delete a book from publication
Access      :PUBLIC
Parameter   :isbn,pubId
Methods     :DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId",(request,response)=>{
    //update publication database
    database.publication.forEach((publication)=>{
      if(publication.id===parseInt(request.params.pubId)){
         const newBookList=publication.books.filter((book)=>
            book!==request.params.isbn
         );
         publication.books=newBookList;
         return;
      }
    });
 
    //update book database
    database.books.forEach((book)=>{
     if(book.ISBN===request.params.isbn){
        const newPublicationList=book.publication.filter((publication)=>
            publication!==parseInt(request.params.pubId)
        );
        book.publication=newPublicationList;
        return;
     }
   });
   return response.json({books:database.books,publications:database.publication,message:"Successfully updated books and publications After deleting a particular publication"});
 });
 

/* 
Route       :/publication/delete
Description :Delete a publication
Access      :PUBLIC
Parameter   :Id
Methods     :DELETE
*/
booky.delete("/publication/delete/:id",(request,response)=>{
    const newPublicationList=database.publication.filter((publication)=>publication.id!==parseInt(request.params.id));
    database.publication=newPublicationList;
    return response.json({publications:database.publication,message:"Successfully updated publications After deleting a particular publication"});
});

booky.listen(3000,()=>console.log("Server is running"));

