const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/assets', express.static('assets'))


const Pokemon = require('../models/pokemon');

//index route
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
       pokes : Pokemon 
    });
})
//show route
app.get('/pokemon/:id', (req,res) => {
    
    res.render('show.ejs', {
        pokemon : Pokemon[req.params.id]
    })
})

//add new pokemon route
app.post('pokemon/:id/new', (req, res) => {
    res.render('new.ejs');
})

//delete pokemon route

//update pokemon route



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });