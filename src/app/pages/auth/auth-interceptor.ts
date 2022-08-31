import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService:AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken=this.authService.getToken();
    const authRequest =req.clone({
      /*** set method although sounds like replacing headers,
      **it just adds new headers.***/
      headers:req.headers.set('Authorization',"Bearer "+authToken)
    });
    return next.handle(authRequest);//authRequest is forwarded
  }

}
/*** Interceptor is a service that attaches the token to GET, POST, PUT etc requests.
 * It is called "interceptor" because it intercepts (attaches itself into)
 * any GET, POST, or any other request being sent to the server side.
 * And in case of the API that doesn't require any token, the token is
 * simply ignored because it will remain undefined for such cases. ***/
