// server.js

const express = require('express');
const app = express();

// Global environment variables
require(`dotenv`).config()
app.listen()


// Greetings
app.get('/greetings', (req, res) => {
    res.render('home.ejs', {
        msg: `Welcome to the page, `,
    });
});

app.get('/greetings/:userName', (req, res) => {
    res.render('show.ejs', {
        msg: `Welcome to the Greeting page, `,
        name: req.params.userName
    });
});

// Roll
app.get('/roll/:diceNumber', (req, res) => {

    let randomNumberInRange = Math.floor(Math.random() * (Number(req.params.diceNumber)+1));

    if(!Number(req.params.diceNumber)) {
        

        res.render('show-rolls.ejs', {
            msg: `You must specify a number.`
        })
    } else if (Number(req.params.diceNumber)) {
        
        res.render('show-rolls.ejs', {
            msg: `You rolled a ${randomNumberInRange}`
        })
    }
});

//Collectibles
const collectibles = [
{ name: 'shiny ball', price: 5.95 },
{ name: 'autographed picture of a dog', price: 10 },
{ name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get(`/collectibles/:collectibleId`, (req,res) => {
    const index = req.params.collectibleId
    const collectible = collectibles[index]

    if(index < collectibles.length) {
        res.render(`show-collectibles.ejs`, {
            
            msg: `So you want a ${collectible.name}? For ${collectible.price}, it can be yours!`
        })
    } else {
        res.render(`show-collectibles.ejs`, {
            msg: `This item is not yet in stock. Check back soon!`
        });
    }

})

//Query parameters
app.get('/hello', (req, res) => {
    res.render('show-results.ejs', {
        msg: `Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`
    });
});

//Shoes
const shoeArray = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];





app.get(`/shoes`, (req, res) => {
    let filteredShoeArray = shoeArray
    if(req.query.minprice !== undefined) {
        filteredShoeArray = filteredShoeArray.filter(shoe => shoe.price >= req.query.minprice)
    } 
    if(req.query.maxprice !== undefined) {
        filteredShoeArray = filteredShoeArray.filter(shoe => shoe.price <= req.query.maxprice)
    } 
    
    if(req.query.type !== undefined) {
        filteredShoeArray = filteredShoeArray.filter(shoe => shoe.type === req.query.type)
    } 
        

    console.log(req.query.minprice,req.query.maxprice,req.query.type);
    res.render('show-shoes.ejs', {
        msg: `These shoes would work: `,
        shoeList: filteredShoeArray
    })

    // res.render(`show-shoes.ejs`, {
    //     msg: shoeArray[0].name
    // })
})


//Listen
app.listen(3001, () => {
    console.log('Listening on port 3001');
    console.log(`the secret is ${process.env.SECRET_PASSWORD}`);// for global variable
});
