/**
 * * Title: app-routing.module.ts
 * Author: Larry Ohaka
 * Date: 08/22/21
 * Description: signin
 */

 import { HomeComponent } from './pages/home/home.component';
 import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
 import { NgModule } from '@angular/core';
 import { Routes, RouterModule } from '@angular/router';
 import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
 import { AuthGuard } from './shared/auth.guard';
 import { SigninComponent } from './pages/signin/signin.component';
 import { ContactComponent } from './pages/contact/contact.component';
 import { AboutComponent } from './pages/about/about.component';
 import { NotFoundComponent } from './pages/not-found/not-found.component';
 
 
 //routes
 const routes: Routes = [
   {
     path: '',
     component: BaseLayoutComponent,
     children: [
       {
         path: '',
         component: HomeComponent,
        canActivate: [AuthGuard],
       },
       {
         path: 'contact',
         component: ContactComponent,
         canActivate: [AuthGuard],
       },
       {
         path: 'about',
         component: AboutComponent,
         canActivate: [AuthGuard]
       }
     ]
   },
   {
     path: 'session',
     component: AuthLayoutComponent,
     children: [
       {
         path: 'signin',
         component: SigninComponent,
       },
       {
         path: 'not-found',
         component: NotFoundComponent,
       }
     ]
   },
   {
     // Asterisk means if there isn't something thats being directed to
     path: '**',
     redirectTo: 'session/not-found'
   }
 
 ];
 
 @NgModule({
   imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
   exports: [RouterModule],
 })
 export class AppRoutingModule { }