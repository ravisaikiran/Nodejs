const { request, response } = require("express");

const express=require("express");

const database=require("./database");

//Initialisation
const booky=express();

//configuration
booky.use(express.json());

/* 
Route       : /
Description :Get all the books
Access      :PUBLIC
Parameter   :None
Methods     :GET
*/
booky.get("/",(request,response)=>{
    return response.json({books:database.books});

});

/* 
Route       : /is
Description :Get Specific book based on isbn
Access      :PUBLIC
Parameter   :isbn
Methods     :GET
*/
booky.get("/is/:isbn",(request,response)=>{
   const getSpecificBook=database.books.filter((book)=>
       book.ISBN===request.params.isbn
   );
   if(getSpecificBook.length===0){
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
booky.get("/c/:category",(request,response)=>{
    const getSpecificBook=database.books.filter((book)=>
        book.category.includes(request.params.category)
    );
    if(getSpecificBook.length===0){
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
booky.get("/l/:language",(request,response)=>{
    const getSpecificBook=database.books.filter((book)=>
        book.language.includes(request.params.language)
    );
    if(getSpecificBook.length===0){
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
booky.get("/author",(request,response)=>{
    return response.json({authors:database.author});
});

/* 
Route       : /author
Description :Get Specific Author based on id
Access      :PUBLIC
Parameter   :id
Methods     :GET
*/
booky.get("/author/:id",(request,response)=>{
    const getSpecificAuthor=database.author.filter((author)=>
        author.id===parseInt(request.params.id)
    );
    if(getSpecificAuthor.length===0){
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
booky.get("/author/book/:isbn",(request,response)=>{
    const getAuthor=database.author.filter((author)=>
        author.books.includes(request.params.isbn)
    );
    if(getAuthor.length===0){
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
booky.get("/publication",(request,response)=>{
    return response.json({publication:database.publication});
});

/* 
Route       : /publication
Description :Get Specific publication based on id
Access      :PUBLIC
Parameter   :id
Methods     :GET
*/
booky.get("/publication/:id",(request,response)=>{
    const getSpecificPublication=database.publication.filter((publication)=>
    publication.id===parseInt(request.params.id)
    );
    if(getSpecificPublication.length===0){
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
booky.get("/publication/book/:isbn",(request,response)=>{
    const getAllPublication=database.author.filter((publication)=>
    publication.books.includes(request.params.isbn)
    );
    if( getAllPublication.length===0){
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
booky.post("/book/add",(request,response)=>{
    const {newBook}=request.body;
    database.books.push(newBook);
    return response.json({Books:database.books});
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
    database.author.push(newAuthor);
    return response.json({authors:database.author});
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
    database.publication.push(newPublication);
    return response.json({publications:database.publication});
});

/* 
Route       : /book/update/title
Description :Updating new book
Access      :PUBLIC
Parameter   :isbn
Methods     :PUT
*/
booky.put("/book/update/title/:isbn",(request,response)=>{
    database.books.forEach((book)=>{
        if(book.ISBN===request.params.isbn){
            book.title=request.body.newBookTitle;
            return;
        }
    });
    return response.json({books:database.books});
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

booky.listen(3000,()=>console.log("Server is running"));

