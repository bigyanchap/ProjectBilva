import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth=this.authService.getIsAuth();
    if(!isAuth){//if not authenticated, for now, navigate away to login page
      this.router.navigate(['/auth/login']);
    }
    return isAuth;
  }
}
