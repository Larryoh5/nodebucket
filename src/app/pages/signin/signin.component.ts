/**
 * * Title: signin.component.ts
 * Author: Larry Ohaka
 * Date: 08/22/21
 * Description: signin
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  // form validation
  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ]
    })
  }

  // signin
  login(): void {
    const empId = this.form.controls['empId'].value;
    // get the empId from the form
    this.http.get('/api/employees/' + empId).subscribe((res) => {
      if (res) {
        // set the cookie
        this.cookieService.set('session_user', empId, 1);
        // Redirects to home page
        this.router.navigate(['/']); 
      } else {
        // Error message
        this.error = 'The ID you entered was not valid, please try again.'; 
      }
    })
  }
}