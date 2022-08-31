import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { RouterModule, Routes } from '@angular/router';

/*** Everything in the AppRoutingModule is loaded initially.
 * So whatever needs lazy loading, better to keep that routing
 * within the module that needs to be lazy loaded.
 * So we keep AuthRoutingModule in AuthModule.***/

 const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}
];
@NgModule({
  imports:[
    RouterModule.forChild(routes)

  ],
  exports:[RouterModule]
})
export class AuthRoutingModule{}
