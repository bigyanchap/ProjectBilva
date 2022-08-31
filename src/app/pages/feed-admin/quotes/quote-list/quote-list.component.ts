import { environment } from './../../../../../environments/environment';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { queryobject } from 'src/app/models/queryobject.model';

import { Quote } from '../../../../models/quote.model';
import { QuotesService } from '../quote.service';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit{

  quotes:Quote[]=[];
  isLoading:boolean=true;

  //PAGINATOR PARAMS
  totalQuotes=0;
  queryParams:queryobject={
    pagesize:environment.defaultPageSize,
    page:1  //current page -- by default should be page number 1.
  }
  defaultQueryParams:queryobject=this.queryParams;
  pageSizeOptions=environment.defaultPageSizeOptions;

  constructor(private quotesService:QuotesService){}
  ngOnInit()
  {
    this.reset();
  }
  reset()
  {
    this.queryParams=this.defaultQueryParams;
    this.getQuotes();
  }
  getQuotes(){
    this.quotesService.getQuotes(this.queryParams)
    .subscribe(res=>{
      this.isLoading=false;
      console.log(res);
      this.totalQuotes = res.maxQuotes;
      this.quotes=res.quotes
      console.log(res.message);
    })
  }
  onChangedPage(event:PageEvent)
  {
    this.isLoading=true;
    console.log(event.pageIndex);
    if((event.pageIndex+1) > this.queryParams.page) {
      this.queryParams.page++;
    } else {
      this.queryParams.page--;
    }
    this.queryParams.pagesize=event.pageSize;
    this.getQuotes();
  }
  onDelete(quoteId:string){
    this.quotesService.deleteQuote(quoteId)
    .subscribe(res=>{
      this.getQuotes();
    })
  }
}
