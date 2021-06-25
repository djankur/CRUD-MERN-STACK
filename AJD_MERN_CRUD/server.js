require("./db/db")

const { urlencoded } = require("body-parser")
const express = require('express')
const app = express()
const bodyparser=require('body-parser')
const path= require('path')
const exphbs = require('express-handlebars');
const ejs = require('ejs')
const mongoose = require('mongoose')
const hbs = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const session=require('express-session')
const flash = require('express-flash')
const MongoDbStore=require('connect-mongo')(session)
const passport=require('passport')
const bycryp=require('bcrypt')
const cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var methodOverride = require('method-override');
require('passport-local')


app.use(express.json())
app.use(bodyparser.json())
app.use(methodOverride());
app.use(cookieParser())
app.use(express.urlencoded({
    extended:false
}))

//session store
let mongoStore = new MongoDbStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
})

// Session config
app.use(session({
    secret: 'cat',
    resave: false,
    store: mongoStore,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

 require('./app/controllers/pp')(passport)

app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);


// app.use((req, res, next)=>{
//     res.locals.message = req.session.message
//     delete req.session.message
//     next()
// })



app.use(flash())


app.use((req, res, next)=>{
     
    res.locals.session = req.session
    res.locals.user=req.user
    next()
  })

 

// set the view engine to ejs
app.set('views', path.join(__dirname, '/views/')); //set path for viewing the pages
app.engine('ejs', exphbs({ extname: 'ejs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/', handlebars: allowInsecurePrototypeAccess(hbs) }));
app.set('view engine', 'ejs'); //app.set('view engine', 'hbs');

//   })


    


// app.use(bodyparser.urlencoded({
//     extended:true
// }))


// //import control , 
 const formCntrl = require('./app/controllers/main')
const { Mongoose } = require("mongoose")


require('./routes/web')(app)


app.listen(9000, ()=>
{
    console.log(" server.js run")
})

app.use('form',formCntrl)