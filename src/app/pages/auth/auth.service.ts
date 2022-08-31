import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from "./auth-data.model";
import { response } from 'express';

@Injectable({providedIn:'root'})
export class AuthService{
  url=environment.apiUrl+"user";
  private isAuthenticated = false;
  private userId:string|null='';
  private token:string|null='';
  //@ts-ignore
  private tokenTimer:NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();

  constructor(private http:HttpClient,private router:Router){}
  getToken(){
    return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
  /***which user can see what can be monitored by
   * this.userId and this.isAuthenticated. ***/
  getUserId(){
    return this.userId;
  }
  createUser(_user:AuthData){
    return this.http.post(this.url+'/signup',_user);
  }
  login(_user:{email:string,password:string}){
    this.http.post<{token:string,expiresIn:number,userId:string}>(this.url+'/login',_user)
    .subscribe(res=>{
      this.token=res.token;
      if(res.token){
        const expiresInDuration=res.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated=true;
        this.userId=res.userId;
        this.authStatusListener.next(true); /*authStatusListener.next means push to other components; whoever wants it should subscribe.*/
        const now= new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
        console.log('expirationDate',expirationDate);
        this.saveAuthData(res.token,expirationDate,this.userId);
        this.router.navigateByUrl('/');//For now, navigate to the default page.
      }
    });
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  /*** Automatically Authorize the user when page refreshed.
   * if the user is within the expiration time.***/
  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    /*Now we have to check if the token is within valid time.*/
    const now = new Date();
    //@ts-ignore
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn>0){
      //@ts-ignore
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId=authInformation.userId;
      this.setAuthTimer(expiresIn/1000);//expiresIn is in milli seconds.
      this.authStatusListener.next(true);
    }
  }
  logout(){
    this.token=null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    /*** If the user logs out even before the session set by server,
     * then we might want to reset that timer.
     * That's because, if user logs back in within the same session time set,
     * then, the javascript timer is a nuisance. ***/
    this.router.navigateByUrl('/');//For now, navigate to the default page.
  }

  private setAuthTimer(duration:number){
    console.log("Setting Timer: "+ duration);
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    },duration*1000); //3600ms*1000=1hour.
  }

  private saveAuthData(token:string,expirationDate:Date,userId:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());//.toISOString serializes & stringifies the date.
    localStorage.setItem('userId',userId);
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if(!token || !expirationDate){
      return;
    }
    return {
      token:token,
      expirationDate:new Date(expirationDate), //converting back the serialized & stringified date
      userId:userId
    }
  }
}
