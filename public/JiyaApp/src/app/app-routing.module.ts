import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
 
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
 
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: '', component: LoginComponent }
  ];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
        routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}