/**
 * * Title: create-task-dialog.component.ts
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Navigation and Layout
 */

 import { Component, OnInit } from '@angular/core';
 import { FormGroup, FormBuilder, Validators}  from '@angular/forms';
 import { MatDialogRef} from '@angular/material/dialog';
 
 @Component({
   selector: 'app-create-task-dialog',
   templateUrl: './create-task-dialog.component.html',
   styleUrls: ['./create-task-dialog.component.css']
 })
 export class CreateTaskDialogComponent implements OnInit {
 
   taskForm: FormGroup;
 //MatDialog reference-- trying to pass the dialog reference, and import form builder
   constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }
 //reactive form field
   ngOnInit(): void {
     this.taskForm = this.fb.group({
       text: [null, Validators.compose([Validators.required])]
     });
 
   }
 //function createTask passes over the data from the user to home component
   createTask(){
     this.dialogRef.close(this.taskForm.value);
   }
 //Empties out task
   cancel() {
     this.dialogRef.close();
   }
 
 }
 