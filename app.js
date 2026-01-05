const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./config/mogoose-connect');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const ownerRouter = require('./routes/ownerRouter');
const session = require("express-session");
const flash = require("connect-flash");

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(cookieParser());
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));

app.use('/',indexRoute);
app.use('/users',userRoute);
app.use('/products',productsRouter);
app.use('/owners',ownerRouter);

app.listen(3000);