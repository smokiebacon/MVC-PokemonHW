const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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

//POST route
app.post('/pokemon', (req, res) => {
    Pokemon.push(req.body);
    res.redirect('/pokemon');
})


//new route
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs')
    });




//show route
app.get('/pokemon/:id', (req,res) => {
    
    res.render('show.ejs', {
        pokemon : Pokemon[req.params.id]
    })
})


//delete pokemon route

//update pokemon route



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });

module.exports = app;