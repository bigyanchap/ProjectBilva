import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, Observable, throwError } from "rxjs";
import { ErrorComponent } from './pages/error/error.component';

/*** Every Error is watched by this Error Interceptor.
 * In case there is error, it intercepts and informs! ***/

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private dialog:MatDialog){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
        let errorMessage="An unknown error occured.";
        if(error.error.message){
          errorMessage=error.error.message;
        }
        this.dialog.open(ErrorComponent,{data:{message:errorMessage}});
        return throwError(()=>error);
      })
    )
  }

}
