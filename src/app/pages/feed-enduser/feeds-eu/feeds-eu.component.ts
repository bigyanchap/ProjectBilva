import { Component, OnInit, HostListener } from '@angular/core';
import { Quote } from '../../../models/quote.model';
import { QuotesService } from '../../feed-admin/quotes/quote.service';

@Component({
  selector: 'app-feeds-eu',
  templateUrl: './feeds-eu.component.html',
  styleUrls: ['./feeds-eu.component.css']
})
export class FeedsEUComponent implements OnInit{
  /*EU means END USER*/
  quotes:Quote[]=[];
  isLoading:boolean=true;
  itemsPerLazyLoad=4;
  loadedAll:boolean=false;
  currentBlock=1;
  totalQuotes=0;

  constructor(private quotesService:QuotesService){}
  ngOnInit()
  {
    this.getQuotesForEU();
  }

  getQuotesForEU(){
    this.quotesService.getQuotesForEU(this.itemsPerLazyLoad,this.currentBlock)
    .subscribe((res:{message:string,quotes:Quote[],maxQuotes:number})=>{
      this.isLoading=false;
      console.log(res);
      this.totalQuotes = res.maxQuotes;
      this.quotes=[...this.quotes,...res.quotes];
      if(this.itemsPerLazyLoad*this.currentBlock>=this.totalQuotes){
        this.loadedAll=true;
      }else{
        this.loadedAll=false;
      }
      console.log(res.message);
    })
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
  //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if(pos == max )   {
      console.log('loadedAll',this.loadedAll);
      if (!this.loadedAll) {
        this.currentBlock++;
        this.getQuotesForEU();
      }
    }
  }

}
