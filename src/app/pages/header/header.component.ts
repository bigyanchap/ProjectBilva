import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from './../auth/auth.service';

@Component({
  templateUrl:'./header.component.html',
  selector:'app-header',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthenticated=false;
  //@ts-ignore
  private authListenerSubscription: Subscription;
  constructor(private authService:AuthService,private router:Router){

  }
  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();// --> In case of reload, we need userIsAuthenticated boolean information again.
    this.authListenerSubscription =
      this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated=>{
        this.userIsAuthenticated=isAuthenticated;
      });
  }
  onLogOut(){
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authListenerSubscription.unsubscribe();
  }
}
