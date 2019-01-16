const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use('/assets', express.static('assets'))

const Pokemon = require('../models/pokemon');

//index route
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
       pokes : Pokemon 
    });
})


//new route
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs')
    });



//EDIT ROUTE
app.get('/pokemon/:id/edit', (req,res) => {
    res.render('edit.ejs', {
        pokemon : Pokemon[req.params.id],
        index: req.params.id
    });
});

//POST route
app.post('/pokemon', (req, res) => {
    Pokemon.push(req.body);
    res.redirect('/pokemon');
})

//PUT or UPDATE route
app.put('/pokemon/:id', (req, res) => {
    Pokemon[req.params.id] = req.body;
    res.redirect('/pokemon');
})

//show route
app.get('/pokemon/:id', (req,res) => {
    res.render('show.ejs', {
        pokemon : Pokemon[req.params.id]
    })
})

//delete pokemon route
app.delete('/pokemon/:id', (req, res) => {
    Pokemon.splice(req.params.id, 1);
    res.redirect('/pokemon')
})


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });

module.exports = app;