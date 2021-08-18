/**
 * * Title: employee-api.js
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Navigation and Layout
 */


const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

/**
 * localhost:300/api/employees/1007
 */
router.get('/:empId', async (req,res) => {

    /** 
     * Code comments
     */
    try{
        Employee.findOne({'empId': req.params.empId}, function(err, employee){
            /**
             * Code comment
             */
            if (err)
            {
                console.log(err);
                res.status(500).send({
                    'message': 'MongoDB server error: ' + err.message
                })
            }

            /**
             * Code comments go here
             */
            else{
                console.log(employee);
                res.json(employee);
            }

        })
    }
    /**
             * Code comments go here
             */
    catch (e)
    {
console.log(e);
res.status(500).send({
    'message': 'Internal server error: ' + e.message
})
    }

})

module.exports = router;