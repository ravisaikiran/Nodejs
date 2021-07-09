//prefix   :   /book

//Initializing Express Router
const Router=require("express").Router();

//DataBase Models
const BookModel=require("../../database/book");

/* 
Route       : /
Description :Get all the books
Access      :PUBLIC
Parameter   :None
Methods     :GET
*/
Router.get("/",async (request,response)=>{
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
Router.get("/is/:isbn",async (request,response)=>{
    
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
Router.get("/c/:category",async (request,response)=>{
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
Router.get("/l/:language",async (request,response)=>{

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
Route       : /book/add
Description :Adding a New book
Access      :PUBLIC
Parameter   :none
Methods     :POST
*/
Router.post("/add",async (request,response)=>{
    try {
        const {newBook}=request.body;

        const addNewBook=await BookModel.create(newBook);
    
        return response.json({Books:addNewBook});
        
    } catch (error) {
        return response.json({error:error.message});
    }
  
});


/* 
Route       : /book/update/title
Description :Updating new book
Access      :PUBLIC
Parameter   :isbn
Methods     :PUT
*/
Router.put("/update/title/:isbn",async(request,response)=>{
    const updatedBook=await BookModel.findOneAndUpdate(
        {
            ISBN:request.params.isbn
        },
        {
            title:request.body.newBookTitle
        },
        {
            new:true,//to get new updated data
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
Parameter   :isbn,authorId
Methods     :PUT
*/
Router.put("/update/author/:isbn/:authorId",async(request,response)=>{

    //Updating book database

    const updatedBook=await BookModel.findOneAndUpdate(
        {
            ISBN:request.params.isbn
        },
        {
            $addToSet:{
                author:parseInt(request.params.authorId)
            },
        },
        {
            new:true,
        }
        );

    //database.books.forEach((book)=>{
     //   if(book.ISBN===request.params.isbn){
     //       return book.author.push(parseInt(request.params.authorId));
     //   }
    //});

    //Updating author database

    const updatedAuthor=await AuthorModel.findOneAndUpdate(
        {
            id:parseInt(request.params.authorId)
        },
        {
            $addToSet:{
                books:request.params.isbn
            },
        },
        {
            new:true,
        }
        );

    //database.author.forEach((author)=>{
    //    if(author.id===parseInt(request.params.authorId)){
    //        return author.books.push(request.params.isbn);
    //    }
    //});

    return response.json({books:updatedBook,authors:updatedAuthor});
});

/* 
Route       :/book/delete
Description :Delete a book
Access      :PUBLIC
Parameter   :isbn
Methods     :DELETE
*/
Router.delete("/delete/:isbn",async(request,response)=>{
    //update book database
    
    const updatedBook =await BookModel.findOneAndDelete({ISBN:request.params.isbn});
    //const updatedBookDatabase=database.books.filter((book)=>book.ISBN!=request.params.isbn);
    //database.books=updatedBookDatabase;
    return response.json({books:updatedBook,message:"Successfully updated books After deleting a particular book"});
});

/* 
Route       :/book/delete/author
Description :Delete an author from a book
Access      :PUBLIC
Parameter   :isbn,authorId
Methods     :DELETE
*/
Router.delete("/delete/author/:isbn/:authorId",async (request,response)=>{

    //update book database
    const updatedBook=await BookModel.findOneAndUpdate(
        {
            ISBN:request.params.isbn
         },
        {
            $pull:{
             author:parseInt(request.params.authorId)
            }
        },
        {
            new:true
        }
        );
   // database.books.forEach((book)=>{
    //  if(book.ISBN===request.params.isbn){
     //    const newAuthorList=book.author.filter((author)=>
     //        author!==parseInt(request.params.authorId)
     //    );
     //    book.author=newAuthorList;
     //    return;
     // }
    //});
 
    //update author database
    
    const updatedAuthor=await AuthorModel.findOneAndUpdate(
     {
         id:parseInt(request.params.authorId)
      },
     {
         $pull:{
          books:request.params.isbn
         }
     },
     {
         new:true
     }
     );
 
    //database.author.forEach((author)=>{
    // if(author.id===parseInt(request.params.authorId)){
     //   const newBookList=author.books.filter((book)=>
     //       book!==request.params.isbn
      //  );
      //  author.books=newBookList;
   //     return;
   //  }
   //});
   return response.json({books:updatedBook,authors:updatedAuthor,message:"Successfully updated books and authors After deleting a particular Author"});
 });
 

module.exports=Router;