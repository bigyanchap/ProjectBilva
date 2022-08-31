import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl:'login.component.html',
  styleUrls:['login.component.css']
})
export class LoginComponent implements OnInit{
  isLoading=false;
  email='';
  password='';

  constructor(private authService:AuthService,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params=>{
        //@ts-ignore
        this.email=params.email;
        //@ts-ignore
        this.password=params.password;
      });

  }

  onLogin(form:NgForm) {
    if(form.invalid){
      return;
    }
    this.authService.login(form.value);
  }
}


