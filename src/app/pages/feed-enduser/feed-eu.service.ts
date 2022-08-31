import { Injectable } from "@angular/core";
import {Subject} from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Quote } from "src/app/models/quote.model";

@Injectable({providedIn:'root'})
export class QuotesService{
  apiUrl=environment.apiUrl;
  private quotes:Quote[]=[];
  private quotesUpdated = new Subject<Quote[]>();

  constructor(private http:HttpClient){}

  getQuotesForEU(itemsPerLazyLoad:number,currentBlock:number){
    const queryParameters=`?itemsPerLazyLoad=${itemsPerLazyLoad}&currentBlock=${currentBlock}`;
    return this.http.get<{message:string,quotes:Quote[],maxQuotes:number}>(this.apiUrl+'quotes'+'/eu'+queryParameters);
  }

}
