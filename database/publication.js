const mongoose=require("mongoose");

//Creating a Publication Schema
const PublicationSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

//Create a Publication model
const PublicationModel=mongoose.model("publications",PublicationSchema);

module.exports=PublicationModel;