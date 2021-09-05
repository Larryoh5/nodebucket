/**
 * * Title: task.service.ts
 * Author: Larry Ohaka
 * Date: 09/4/21
 * Description: tasks
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import { Item } from '../models/item.interface'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  findAllTasks(empId: number): Observable<any>{
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  createTask(empId: number, task:string): Observable<any>{
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    });
  }

//A put request function (Updates task column). Passes over an array of 'todo' and 'done'
  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    }); 
  }
  //A delete function that takes in the employee and task id which returns an observable from the employees-api
  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}
