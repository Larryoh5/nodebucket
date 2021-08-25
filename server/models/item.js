/**
 * * Title: item.js
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Employees
 */


const mongoose = require ('mongoose');
//Schema Object
const Schema = mongoose.Schema;


let itemSchema = new Schema ({
    //Field
    test: { type:String }
});

//export schema--return it
module.exports = itemSchema;