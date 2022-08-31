import { Injectable } from "@angular/core";
import { Quote, _Quote } from "../../../models/quote.model";
import {Subject} from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { queryobject } from "../../../models/queryobject.model";

@Injectable({providedIn:'root'})
export class QuotesService{
  apiUrl=environment.apiUrl+"quotes/";
  private quotes:Quote[]=[];
  private quotesUpdated = new Subject<Quote[]>();

  constructor(private http:HttpClient){}

  getQuotes(queryParams:queryobject){
    const queryParameters=`?pagesize=${queryParams.pagesize}&page=${queryParams.page}`;
    return this.http.get<{message:string,quotes:Quote[],maxQuotes:number}>(this.apiUrl+queryParameters);

  }
  getQuotesForEU(itemsPerLazyLoad:number,currentBlock:number){
    const queryParameters=`?itemsPerLazyLoad=${itemsPerLazyLoad}&currentBlock=${currentBlock}`;
    return this.http.get<{message:string,quotes:Quote[],maxQuotes:number}>(this.apiUrl+'eu'+queryParameters);
  }

  getQuoteById(quoteId:string)
  {
    return this.http.get<Quote>(this.apiUrl+quoteId);
  }

  addQuote(quote:Quote,image:File){
    const quoteData=new FormData();
    quoteData.append("title",quote.title);
    quoteData.append("content",quote.content);
    quoteData.append("image",image,image.name);//quote.title here does job of imagename
    this.http.post<{message:string,quote:Quote}>(this.apiUrl,quoteData)
      .subscribe((responseData)=>{
        this.quotes.push(responseData.quote);
        this.quotesUpdated.next([...this.quotes]);
      });
  }

  updateQuote(quote:Quote,image:File|string)
  {
    let quoteData: Quote | FormData;
    if(typeof(image)==='object'){
      //For file image, we make formdata
      quoteData=new FormData();
      quoteData.append("id",quote.id);
      quoteData.append("title",quote.title);
      quoteData.append("content",quote.content);
      quoteData.append("image",image,image.name);
    }
    else
    {
      //For string image, we make json data
      quoteData={
        id:quote.id,
        title:quote.title,
        content:quote.content,
        imagePath:image
      }
    }
    return this.http.put<{message:string}>(this.apiUrl+quote.id,quoteData);
  }

  deleteQuote(quoteId:string){
    return this.http.delete(this.apiUrl+quoteId);
  }
}
