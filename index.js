require("dotenv").config();


const { request, response } = require("express");

//FrameWork
const express=require("express");
const mongoose=require("mongoose");

//Database
const database=require("./database");


//Microservices Routes
const Books=require("./API/Book/index");
const Authors=require("./API/Author/index");
const Publications=require("./API/Publication/index");

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


//Initializing Microservices
booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publications);


booky.listen(3000,()=>console.log("Server is running"));

