let books=[
    {
        ISBN:"1234Book",
        title:"Getting Started with MERN",
        pubdate:"18-04-2001",
        language:"en",
        numPage:250,
        author:[1,2],
        publication:[1,2,4],
        category:["tech","programming","comics","education"],
    },
    {
        ISBN:"1234",
        title:"Getting Started with MERN-API",
        pubdate:"28-04-2007",
        language:"en",
        numPage:300,
        author:[1,2],
        publication:[1,2],
        category:["tech","programming"],
    },
];

const author=[
    {
        id:1,
        name:"venkata_narasimham",
        books:["1234Book","1234"],
    },
    {
        id:2,
        name:"sailaja",
        books:["1234Book","1234"],
    },
    {
        id:3,
        name:"ravi",
        books:[],
    },
  
];

let publication=[
    {
        id:1,
        name:"writex",
        books:["1234Book","1234"],
    },
    {
        id:2,
        name:"Ridex",
        books:[],
    },
    {
        id:3,
        name:"sai anusha",
        books:[],
    },
    {
        id:4,
        name:"royalfield",
        books:["1234Book"],
    },
];

module.exports={books,author,publication};