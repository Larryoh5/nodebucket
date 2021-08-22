/**
 * * Title: employee-api.js
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Navigation and Layout
 */

 const express = require("express");
 const Employee = require("../models/employee");
 
 const router = express.Router();
 
 // Employee ID
 router.get("/:empId", async (req, res) => {
   // Find employee ID
   try {
     Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      
       if (err) {
         console.log(err);
         res.status(500).send({
           message: "MongoDB server error: " + err.message,
         });
       }
       /* Return and log the employee object to the console if the database is able to find the employee by id */
       else {
         console.log(employee);
         res.json(employee);
       }
     });
   } 
   catch (e) {
     // Any and all errors will be logged to the console
     console.log(e);
     res.status(500).send({
       message: "Internal server error: " + e.message,
     });
   }
 });
 
 module.exports = router;