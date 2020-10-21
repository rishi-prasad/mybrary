const router = require('express').Router();
const Author = require('../models/author');

// Route for getting all authors

router.get('/', async (req, res) => {
    let searchOptions = {}; // this are options for search results
    if (req.query.name != null && req.query.name !== '') { // we are using req.query instead of req.body because get requests send information to the server using query parameters and post request send it through body of the request
        searchOptions.name = new RegExp(req.query.name, 'i');   // we created a reg exp to find the user with same reg exp
    }
    try {
        const authors = await Author.find(searchOptions); // Author.find({}) finds a field and has an argument as object of conditions. In this case we want to access all authors so we passed empty object which will get all authors from authors document
        res.render('authors/index', {
            allAuthors: authors,
            searchOptions: req.query                      // this sends our search queries to our template
        }); // here we passed all authors array to our ejs files
    } catch (e) {
        res.redirect('/');
    }
});

// Route to display new author form

router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() }); // second argument allows to create an object to embed in database Author constructor provides interface to the mongodb
});

// Route for creating new author

router.post('/', async (req, res) => {
    const author = new Author({ // this creates a new object that we can embed in database
        name: req.body.name     // this is the value that we want to give for our schema 
    });

    try {
        const newAuthor = await author.save();
        // res.redirect(`authors/${newAuthor.id}`); // this redirects our new author to new page with their database id as a new page for their account
        res.redirect('authors');
    } catch (e) {
        res.render('authors/new', {
            author: author,       // this enable access autor object from our ejs template
            errorMessage: "Error creating author" 
        });
    }

    // author.save((err, newAuthor) => { // author.save() saves the document first argument is err and second argument is the new author created
    //     if (err) {
    //         res.render('authors/new', {
    //             author: author,       // this enable access autor object from our ejs template
    //             errorMessage: "Error creating author" 
    //         });
    //     } else {
    //         // res.redirect(`authors/${newAuthor.id}`); // this redirects our new author to new page with their database id as a new page for their account
    //         res.redirect('authors');
    //     }
    // });
});



module.exports = router;