const Router=require("express").Router();

//model
const PublicationModel=require("../../database/publication");
//relative path

 /* 
Route       : /publication
Description :Get all the publications
Access      :PUBLIC
Parameter   :none
Methods     :GET
*/
Router.get("",async (request,response)=>{
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
Router.get("/:id",async (request,response)=>{
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
Router.get("/book/:isbn",async (request,response)=>{

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
Route       : /publication/add
Description :Adding new publication
Access      :PUBLIC
Parameter   :none
Methods     :POST
*/
Router.post("/add",(request,response)=>{
    const {newPublication}=request.body;
    const addNewPublication=PublicationModel.create(newPublication);
    return response.json({publications:addNewPublication});
});




/* 
Route       :/publication/update/name
Description :Update publication name for a particular id
Access      :PUBLIC
Parameter   :id
Methods     :PUT
*/
Router.put("/update/name/:id",async(request,response)=>{
    //Updating publication database
    const updatedPublication=await PublicationModel.findOneAndUpdate(
        {
            id:parseInt(request.params.id)
        },
        {
            name:request.body.newPublicationName
        },
        {
            new:true,//to get new updated data
        }
        );

    //database.publication.forEach((publication)=>{
    //    if(publication.id===parseInt(request.params.id)){
     //       publication.name=request.body.newName;
     //       return;
     //   }
    //});
   return response.json({publications:updatedPublication});
});

/* 
Route       :/publication/update/book
Description :Update/Add new books to publications
Access      :PUBLIC
Parameter   :isbn
Methods     :PUT
*/
Router.put("/update/book/:isbn",async(request,response)=>{
    //Updating publication database
    const updatedPublication=await PublicationModel.findOneAndUpdate(
        {
            id:request.body.pubId
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

    //database.publication.forEach((publication)=>{
    //    if(publication.id===request.body.pubId){
    //        return publication.books.push(request.params.isbn);
     //   }
    //});
  //Updating book database
  const updatedBook=await BookModel.findOneAndUpdate(
    {
        ISBN:request.params.isbn
    },
    {
        $addToSet:{
            publication:request.body.pubId
        },
    },
    {
        new:true,
    }
    );

  //database.books.forEach((book)=>{
    //if(book.ISBN===request.params.isbn){
     //  return book.publication.push(request.body.pubId);
    //}
//});

   return response.json({books:updatedBook,publications:updatedPublication,message:"Successfully updated books to publication"});
});



/* 
Route       :/publication/delete/book
Description :Delete a book from publication
Access      :PUBLIC
Parameter   :isbn,pubId
Methods     :DELETE
*/
Router.delete("/delete/book/:isbn/:pubId",async (request,response)=>{
    //update publication database
    const updatedPublication=await PublicationModel.findOneAndUpdate(
        {
            id:parseInt(request.params.pubId)
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

   // database.publication.forEach((publication)=>{
    //  if(publication.id===parseInt(request.params.pubId)){
    //     const newBookList=publication.books.filter((book)=>
    //        book!==request.params.isbn
     //    );
     //    publication.books=newBookList;
     //    return;
     // }
    //});
 
    //update book database

    const updatedBook=await BookModel.findOneAndUpdate(
        {
            ISBN:request.params.isbn
         },
        {
            $pull:{
                publication:parseInt(request.params.pubId)
            }
        },
        {
            new:true
        }
        );

    //database.books.forEach((book)=>{
     //if(book.ISBN===request.params.isbn){
     //   const newPublicationList=book.publication.filter((publication)=>
     //       publication!==parseInt(request.params.pubId)
     //   );
     //   book.publication=newPublicationList;
     //   return;
    // }
   //});
   return response.json({books:updatedBook,publications:updatedPublication,message:"Successfully updated books and publications After deleting a particular publication"});
 });
 

/* 
Route       :/publication/delete
Description :Delete a publication
Access      :PUBLIC
Parameter   :Id
Methods     :DELETE
*/
Router.delete("/delete/:id",async(request,response)=>{
    const updatedPublication=await PublicationModel.findOneAndDelete({id:parseInt(request.params.id)});
    //const newPublicationList=database.publication.filter((publication)=>publication.id!==parseInt(request.params.id));
    //database.publication=newPublicationList;
    return response.json({publications:updatedPublication,message:"Successfully updated publications After deleting a particular publication"});
});

module.exports=Router;