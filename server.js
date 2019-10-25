const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const PORT = 3000; 

app.set('view engine', 'ejs');

app.use(session({
    secret: "this is a random secret string", // is the key that opens up our session
    // which is always stored on the server
    resave: false, // only save our session when we add/or mutate
    // a property
    saveUninitialized: false // only save the cookie when
    // we add a property to it, When the user logs in or registers
    // we only really want to add stuff to our session after user
    // logs in or registers to comply with the law
  }));  
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const userController = require('./controllers/users')
app.use('/auth', userController);

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log('Listening on', PORT);
})