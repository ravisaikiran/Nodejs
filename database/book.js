const mongoose=require("mongoose");

//Creating a book Schema
const BookSchema=mongoose.Schema({
    ISBN: {
        type:String,
        required:true,
        minLength:8,
        maxLength:10,
    },
    title:{
        type:String,
        required:true,
        minLength:10,
        maxLength:30,
    },
    pubdate:{
        type:String,
        required:true,
        minLength:8,
        maxLength:12,
    },
    language:{
        type:String,
        required:true,
        minLength:2,
        maxLength:8,
    },
    numPage:{
        type:Number,
        required:true,
        minLength:1,
        maxLength:5,
    },
    author:[Number],
    publication:[Number],
    category:[String], 
});

//Create a book model
const BookModel=mongoose.model("books",BookSchema);

module.exports=BookModel;