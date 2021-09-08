/**
 * * Title: employee.js
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Employees
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 const ItemDocument = require('./item');
 
 /**
  * Employee schema strings
  */
 
 let employeeSchema = new Schema ({
     empId: { type: String, unique: true },
     firstName: { type: String },
     lastName: {type: String},
     //Collection of item documents
     todo: [ItemDocument],
     //Collection of item documents
     done: [ItemDocument]
 }, {collection: 'employees'});
 
 module.exports = mongoose.model('Employee', employeeSchema)