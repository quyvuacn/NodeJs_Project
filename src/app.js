const express = require('express')
const session = require('express-session')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const bodyParser = require('body-parser')
const route = require('./routes')
const Auth = require('./app/middlewares/authMiddleware')
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload')



const port = process.env.PORT || 8000
require('dotenv').config()

//Public
const public = path.join(__dirname, 'public')
app.use(express.static(public))

//Connect Mysql


//Use EJS (templates view)
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

//Use Front express-ejs-layouts
app.use(expressLayouts)
app.set('layout','front/layout')

//Use body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//File Upload
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}))
//Session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge : 20 * 60 * 1000 // 20 minutes
    }
}))

//Override method (PUT, DELETE)
app.use(methodOverride('_method'))


//Listen port 8000
app.listen(port)





//Route init
app.use(Auth.locals)

route(app)

