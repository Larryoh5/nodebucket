/**
 * * Title: base-layout.component.ts
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Navigation and Layout
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: boolean;

  //Cookie service, router
  constructor(private cookieService: CookieService, private router: Router) { 
    //isLoggedIn constructor ------> "? true : false" = if this returns something it will return true, otherwise it will return false
    this.isLoggedIn = this.cookieService.get('session_user')? true : false;
  }

  ngOnInit(): void {
  }


//Signout
  signOut(){
    this.cookieService.deleteAll();
    //pushes you back to the signin page
    this.router.navigate(['/session/signin']);
  }

}
