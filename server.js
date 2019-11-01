const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
require('./db/db');

app.set('view engine', 'ejs');

app.use(session({
    secret: "this is a random secret string", 
    // is the key that opens up our session
    // which is always stored on the server
    resave: false, 
    // only save our session when we add/or mutate
    // a property
    saveUninitialized: false 
    // only save the cookie when
    // we add a property to it, When the user logs in or registers
    // we only really want to add stuff to our session after user
    // logs in or registers to comply with the law
  }));  

app.use(methodOverride('_method'));
app.use(express.static('public'));
//body parser 
app.use(express.urlencoded({extended: false}));
app.use(express.json())

const isLoggedIn = (req, res, next) => {
    if (!req.session.logged) {
        res.redirect('/');
    }
    next();
}


const userController = require('./controllers/users');
const dashController = require('./controllers/dashboard');

app.use('/dash', isLoggedIn, dashController);
app.use('/auth', userController);

app.get('/', (req, res) => {
    console.log(req.session, 'home route');
    res.render('home', {
        logOut: req.session.logOutMsg,
    });
})

// app.post('/', async (req, res) =>{
//     const createdExpense = await Expenses.create(req.body)
//     console.log(createdExpense)
//     const user = await User.findById('5db67f7637910e6eed426d67')
//     user.expenses.push(createdExpense)
//     await user.save()
//     console.log(user)
//     res.send(user)
// })

app.listen(PORT, () => {
    console.log('Listening on', PORT);
})