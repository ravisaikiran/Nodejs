const Router=require("express").Router();

//model
const AuthorModel=require("../../database/author");
//relative path

/* 
Route       : /author
Description :Get all the authors
Access      :PUBLIC
Parameter   :none
Methods     :GET
*/
Router.get("",async (request,response)=>{
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
Router.get("/:id",async (request,response)=>{

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
Router.get("/book/:isbn",async(request,response)=>{
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
Route       : /author/add
Description :Adding new author
Access      :PUBLIC
Parameter   :none
Methods     :POST
*/
Router.post("/add",(request,response)=>{
    const {newAuthor}=request.body;
    const addNewAuthor=AuthorModel.create(newAuthor);
    return response.json({authors:addNewAuthor});
});

/* 
Route       :/author/update/name
Description :Update author name for a particular id
Access      :PUBLIC
Parameter   :id
Methods     :PUT
*/
Router.put("/update/name/:id",async(request,response)=>{
    //Updating author database
    const updatedAuthor=await AuthorModel.findOneAndUpdate(
        {
            id:parseInt(request.params.id)
        },
        {
            name:request.body.newAuthorName
        },
        {
            new:true,//to get new updated data
        }
        );

   // database.author.forEach((author)=>{
    //    if(author.id===parseInt(request.params.id)){
     //       author.name=request.body.newName;
     //       return;
     //   }
    //});
   return response.json({authors:updatedAuthor});
});



/* 
Route       :/author/delete
Description :Delete an author 
Access      :PUBLIC
Parameter   :authorId
Methods     :DELETE
*/
Router.delete("/delete/:authorID",async (request,response)=>{
    const updatedAuthor =await AuthorModel.findOneAndDelete({id:parseInt(request.params.authorID)});
    //const newAuthorList=database.author.filter((author)=>author.id!==parseInt(request.params.authorID));
    //database.author=newAuthorList;
    return response.json({authors:updatedAuthor,message:"Successfully updated authors After deleting a particular Author"});
});

 module.exports=Router;