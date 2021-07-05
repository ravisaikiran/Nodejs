const books=[
    {
        ISBN:"1234Book",
        title:"Getting Started with MERN",
        pubdate:"18-04-2001",
        language:"en",
        numPage:250,
        author:[1,2],
        publication:[1,2],
        category:["tech","programming","comics","education"],
    },
];

const author=[
    {
        id:1,
        name:"venkata_narasimham",
        books:["1234Book","123"],
    },
    {
        id:2,
        name:"sailaja",
        books:["1234Book"],
    },
];

const publication=[
    {
        id:1,
        name:"writex",
        books:["1234Book"],
    }
];

module.exports={books,author,publication};