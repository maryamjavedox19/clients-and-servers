const express = require('express');    //npm package

// express app
const app = express();


// app.set('views', 'myviewsfolder');    //if ejs are in different folder


// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');      //ejs--npm package

app.get('/', (req, res) => {

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];

//   res.send('<p>home page</p>');
  res.render('index', { title: 'Home', blogs });                   //blogs:blogs                          //render a view
});



app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about',  { title: 'About'});
  });
  


  // redirects
app.get('/blogs/create', (req, res) => {  
    res.render('create', { title: 'Create a new blog' });
  });     


  // 404 page
app.use((req, res) => { 
    res.status(404).render('404', { title: '404' })   //it will only be fired if it reaches till this point
  });                                         //should always be at the very bottom
  