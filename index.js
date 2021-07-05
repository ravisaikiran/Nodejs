const { request, response } = require("express");

const express=require("express");

const database=require("./database");

//Initialisation
const booky=express();

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

 

booky.listen(3000,()=>console.log("Server is running"));

