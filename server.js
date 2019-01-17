const express = require('express');
const multer = require('multer');
const path = require('path');

// Set Storage Engine
const storage = multer.diskStorage( {
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
});

//init upload
const upload = multer( {
    storage : storage,
    limits: {fileSize: 10000000},       //set file size in bytes limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

//check File Type
function checkFileType(file, cb) {
    //allowed extensions
    const fileTypes = /jpeg|jpg|png|gif/;
    //check extention
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only images are allowed.');
    }
}

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use('/public', express.static('public'))

const Pokemon = require('./models/pokemon');

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
    upload(req, res, (err) => {
        if (err){
            res.redirect('/pokemon');
        } else {
            console.log(req.file);
        }
    })
    
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