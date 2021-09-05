/**
 * * Title: employee-api.js
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Navigation and Layout
 */

 const express = require("express");

 const Employee = require("../models/employee");
 const router = express.Router();
 const BaseResponse = require('../models/base-response')
 


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
 router.get ('/:empId/tasks', async(req,res) =>{
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
          console.log(employee);
          res.json(employee);
          }
     });
   }
   catch(e){
     console.log(e);
     res.status(500).send({
       'message': "internal server error" + e.message
     });
   }
 });


 

 /**
  * Create tasks
  */
 router.post('/:empId/tasks', async(req, res) =>{
   try{
     //returns the employee record
     Employee.findOne({ empId : req.params.empId}, function(err,employee){
       if (err){
         console.log(err);
         res.status(501).send({
           message: 'MongoDB Expectation:' + err.message
         });
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
               message: 'MongoDB Expectation:' + err.message
             });
           }
           //Updated record will be returned to Angular
           else{
             console.log(updatedEmployee);
             res.json(updatedEmployee)
             
           }
         });
       }
     });
   }
   catch(e){
    console.log(e);
    res.status(500).send({
      message: "internal server error" + e.message
    })
  }
})



//Update Task API
router.put('/:empId/tasks', async(req, res) =>{
  try{
    Employee.findOne({'empId': req.params.empId}, function(err, employee){
      if(err){
        console.log(err);
        const updateTaskMongoErrorResponse = new BaseResponse ('501', 'Mongo Server error', err);
        res.status(501).send(updateTaskMongoErrorResponse.toObject());
      }
      else{
        console.log(employee);
        employee.set({
          todo: req.body.todo,
          done: req.body.done
        })

        employee.save(function(err, updatedEmployee){
          if (err){
            console.log(err);
            const updateTaskMongoOnSaveErrorResponse = new BaseResponse ('501', "Mongo Server Error", err);
            res.status(501).send(updateTaskMongoOnSaveErrorResponse.toObject());
                    }
                    else{
                      console.log(updatedEmployee);
                      const updatedTaskSuccessResponse = new BaseResponse ('200', 'Update Successful', updatedEmployee);
                      res.status(200).send(updatedTaskSuccessResponse.toObject());
                    }
        })
      }
    })

  }
  //Catches error message
  catch (e){
    console.log(e);
    const updateTaskServerErrorResponse= new BaseResponse('500', "Internal server error", e);
    res.status(500).send(updateTaskServerErrorResponse.toObject());

  }
})

//Delete Task API
router.delete('/:empId/tasks/:taskId', async(req,res)=>{
  try{
    Employee.findOne({'empId': req.params.empId }, function(err, employee){
      if(err){
        console.log(err);
          const deleteTaskMongoErrorResponse = new BaseResponse('501', 'Mongo Server error', err);
          res.status(501).send(deleteTaskMongoErrorResponse.toObject());
        }else{
          console.log(employee);
          const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
          const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

          if (todoItem){
            employee.todo.id(todoItem._id).remove();
            employee.save(function(err, updatedTodoItemEmployee){
              if (err){
                console.log(err);
                const deleteTodoItemMongoErrorResponse = new BaseResponse ('501', "Mongo Server error", err);
                res.status(501).send(deleteTodoItemMongoErrorResponse.toObject());

              }else{
                console.log(updatedTodoItemEmployee);
                const deleteTodoItemSuccessResponse = new BaseResponse ('200', "Item removed from Todo array", updatedTodoItemEmployee);
                res.status(200).send(deleteTodoItemSuccessResponse.toObject());
              }
            })
          }else if (doneItem){
            employee.done.id(doneItem._id).remove();
            employee.save(function(err, updateDoneItemEmployee){
              if(err){
                console.log(err);
                const deleteDoneItemMongoErrorResponse = new BaseResponse ('501', "Mongo Server Error", err);
                res.status(501).send(deleteDoneItemMongoErrorResponse.toObject());
              }else{
                console.log(updatedTodoItemEmployee);
                const deleteDoneItemSuccessResponse = new BaseResponse ('200', "item removed from Done array", updateDoneItemEmployee);
                res.status(200).send(deleteDoneItemSuccessResponse.toObject());
              }
            });
          }else {
            console.log('Invalid taskId:' + req.params.taskId);
            const deleteTaskNotFoundResponse = new BaseResponse ('300', 'Unable to locate requested resource', req.params.taskId);
            res.status(300).send(deleteTaskNotFoundResponse.toObject());
          }
        }
      
    })
  }
  catch (e){
    console.log(e);
    const deleteTaskServerError= new BaseResponse('500', 'Internal server', e);

    res.status(500).send(deleteTaskServerError.toObject());
  }
});

//Exports modules to router
 module.exports = router;