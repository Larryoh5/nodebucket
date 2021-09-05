/**
 * * Title: home.component.ts
 * Author: Larry Ohaka
 * Date: 08/22/21
 * Description: signin
 */

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from './../../shared/services/task.service';
import { CreateTaskDialogComponent } from './../../shared/create-task-dialog/create-task-dialog.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) { 
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('--Service response from findAllTasks API--');
      console.log(res);

      this.employee = res;
      console.log ('--Employee object--');
      console.log(this.employee);
    }, err => {
      console.log('--Server error--');
      console.log(err);
    }, () =>{

      console.log('--onComplete of the findAllTasks service call--');

      this.todo = this.employee.todo;
      this.done = this.employee.done;


      console.log('--Todo tasks--');
      console.log(this.todo);

      console.log('--Done tasks--');
      console.log(this.done);   

    });
  }

  ngOnInit(): void {
  }


  openCreateTaskDialog(){
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data){
        this.taskService.createTask(this.empId, data.text). subscribe(res =>{
          this.employee = res;
        }, err => {
          console.log('--onError of the createTask service call--');
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        });
      }
    });
  }

  //Drop function
  drop(event: CdkDragDrop<any[]>){
if (event.previousContainer === event.container){
  //In the current array we need to take the data
  moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  console.log('Reordered the existing list of task items.');
  this.updateTaskList(this.empId, this.todo, this.done);

}
else{
  //Transfer data between the two arrays
  transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  console.log('Moved task Item into the other container');
  this.updateTaskList(this.empId, this.todo, this.done);

}
  }



  //Delete task function
  deleteTask(taskId: string): void{
    //Confirms if you want to delete
if(confirm('Are you sure you want to delete this Task?')){
  if (taskId) {
    //confirms deletion
    console.log(`Task item: ${taskId} was deleted!`);
    //task delete function
    this.taskService.deleteTask(this.empId, taskId).subscribe(res =>{
      this.employee = res.data;
    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;

    });
  }
}
}

//Private function that takes the empId, todo, and done and then makes an API call to the server
private updateTaskList(empId: number, todo: Item[], done: Item[]): void {
  this.taskService.updateTask(this.empId, this.todo, this.done).subscribe(
    (res) => {
      this.employee = res.data;
    },
    (err) => {
      console.log(err);
    },
    () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    }
  );
}
}
