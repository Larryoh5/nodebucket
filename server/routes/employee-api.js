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

 



 /**
  * findAllTasks API
  *  */ 
 router.post ('/:empId/tasks', async(req,res) =>{
   try{
//In this projection it only returns the empId todo and done
     Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err,employee){
       if (err){
         console.log(err);
         //if error return this 501 error
         res.status(501).send ({
           'message': 'MongoDB Expectation:' + err.message
         })      
        }
        //if no error return
        else{
          console.log(updatedEmployee);
          res.json(updatedEmployee);
          }
     })
   }
   catch(e){
     console.log(e);
     res.status(500).send({
       'message': "internal server error" + e.message
     })
   }
 })


 

 /**
  * Create tasks
  */
 router.post('/:empId/tasks', async(req, res) =>{
   try{
     //returns the employee record
     Employee.findOne({'empId': req.params.empId}, function(err,employee){
       if (err){
         console.log(err);
         res.status(501).send({
           'message': 'MongoDB Expectation:' + err.message
         })
       }
       else{
         console.log(employee);
         const newTask = {
           text: req.body.text
         };
         //Access the todo field off of the record that returns from the database
         employee.todo.push(newTask);
         //saves the record that you got back
         employee.save(function(err, updatedEmployee){
           //if there is an error
           if (err){
             console.log(err);
             res.status(501).send({
               'message': 'MongoDB Expectation:' + err.message
             })
           }
           //Updated record will be returned to Angular
           else{
             console.log(updatedEmployee);
             res.json(updatedEmployee);
           }
         })
       }
     })
   }
   catch(e){
    console.log(e);
    res.status(500).send({
      'message': "internal server error" + e.message
    })
  }
})


//Exports modules to router
 module.exports = router;