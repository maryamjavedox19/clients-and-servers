const express = require('express');    //npm package
const morgan = require('morgan');
const mongoose=require('mongoose');
const Blog = require('./models/blog');
// express app
const app = express();


// connecting to mangodb
const dbURI='mongodb+srv://mariumox19:brooklyn99@nodetuts.ma1nobr.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(3000))      //only going to listen when connection to database is made
.catch(err => console.log(err));

// app.set('views', 'myviewsfolder');    //if ejs are in different folder


// register view engine
app.set('view engine', 'ejs');      //ejs--npm package

// middleware & static files
app.use(express.static('public'));      //to access css file etc    anything inside pub;ic is going to be available
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});


app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5ea99b49b8531f40c0fde689')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});


app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});  


  // 404 page
app.use((req, res) => { 
    res.status(404).render('404', { title: '404' })   //it will only be fired if it reaches till this point
  });                                         //should always be at the very bottom
  