/**
 * * Title: employee.js
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Employees
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Employee schema strings
 */

let employeeSchema = new Schema ({
    empId: { type: String, unique: true },
    firstName: { type: String },
    lastName: {type: String}
}, {collection: 'employees'});

module.exports = mongoose.model('Employees', employeeSchema)