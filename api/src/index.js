require('rootpath')();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('./_helper/jwt');
const errorHandler = require('./_helper/error-handler');

//initialization
const app = express();

//settings
app.set('port', process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000);

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//use JWT auth to secure the api
app.use(jwt());

//api routes
app.use('/api' , require('./user/user_controller'));

//global error handler
app.use(errorHandler);

//start server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});