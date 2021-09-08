/**
 * * Title: app.js
 * Author: Larry Ohaka
 * Date: 08/22/21
 * Description: app component
 */



/**
 * Require statements
 */
 const express = require('express');
 const http = require('http');
 const morgan = require('morgan');
 const bodyParser = require('body-parser');                        
 const path = require('path');
 const mongoose = require('mongoose');
 const EmployeeAPI = require('./routes/employee-api');
 
 
 /**
  * App configurations
  */
 let app = express();
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({'extended': true}));
 app.use(morgan('dev'));
 app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
 app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));
 
 /**
  * Variables
  */
 const port = process.env.PORT || 3000; // server port
 
 // TODO: This line will need to be replaced with your actual database connection string
 const conn = 'mongodb+srv://nodebucketa337_user:9730@cluster0.7thzg.mongodb.net/nodebucketa337?retryWrites=true&w=majority';
 
 /**
  * Call mongoose
  */
 mongoose.connect(conn, {
   promiseLibrary: require('bluebird'),
   useUnifiedTopology: true,
   useNewUrlParser: true,
 }).then(() => {
   console.debug(`Connection to the database instance was successful`);
 }).catch(err => {
   console.log(`MongoDB Error: ${err.message}`)
 }); 
 //----------------------end mongoose connection------------------------------
 
 /**
  * APIs go here...
  */
 app.use('/api/employees', EmployeeAPI);
   
 /**
  * Create and start server
  */
 http.createServer(app).listen(port, function() {
   console.log(`Application started and listening on port: ${port}`);
 }); 
 