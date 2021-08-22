import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router,} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  // If the user is not aurthyorized this router will navigate to the signin page
  constructor(private router: Router, private cookieService: CookieService) {}

  /**
   * 
   * @param route 
   * @param state 
   * @returns 
   */

  // User authentication
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
  {
    const sessionUser = this.cookieService.get('session_user');

    //Redirect if user is not authenticated
    if (sessionUser) {
      return true; // allow navigation
    } else 
    {
      // Redirect to signin page
      this.router.navigate(['/session/signin']);
      return false;
    }
  }
}