/**
 * * Title: base-response.js
 * Author: Larry Ohaka
 * Date: 09/1/21
 * Description: Employees
 */
/**
 * Handles API calls
 */




//When a new Base class object you need to pass in the status code, the custom message, and the data that will be displayed to the user
class BaseResponse{
    constructor(code, msg, data){
    this.code=code;
    this.msg=msg;
    this.data=data
}

//Returns the .json format
toObject() {
    return {
        'code': this.code,
        'msg': this.msg,
        'data': this.data,
        'timestamp': new Date().toLocaleDateString()

    }
}
}

//the response portion of the response request pattern
module.exports = BaseResponse;