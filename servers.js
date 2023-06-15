const http = require('http');
const fs = require('fs');      //for filing
const _ = require('lodash');    //npm package


const server = http.createServer((req, res) => {    //this is going to send it to home page when request is made
   // lodash
   const num = _.random(0, 20);
   console.log(num);


   const greet = _.once(() => {
    console.log('hello');
  });
  greet();
  greet();



    // set header content type
    res.setHeader('Content-Type', 'text/html');
    // res.write('<p>hello, ninjas</p>');
    // res.write('<p>hello again, ninjas</p>');
    // res.end();


      // routing
  let path = './views/';
  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
    //   redirecting
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }



     // send html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    // res.write(data);
    res.end(data);
  });

    
});

// localhost is the default value for 2nd argument
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});


