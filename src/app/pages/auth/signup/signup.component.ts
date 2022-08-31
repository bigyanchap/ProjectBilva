import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component } from "@angular/core";

@Component({
  templateUrl:'signup.component.html',
  styleUrls:['signup.component.css']
})
export class SignupComponent{

  isLoading=false;
  constructor(private authService:AuthService,private router:Router){}

  onSignup(form:NgForm) {
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value)
    .subscribe({
      next:res=>{
        //@ts-ignore
        if(res.success){

        }
        console.log(res);
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.router.navigate(['/login'],{queryParams:{email:form.value.email,password:form.value.password}});
      }
      /*August 2022, this is the new syntax for subscribe. Old syntax is deprecated!*/
    })
  }

}


