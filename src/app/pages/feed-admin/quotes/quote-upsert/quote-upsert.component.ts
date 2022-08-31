import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Quote, _Quote } from "../../../../models/quote.model";
import { QuotesService } from "../quote.service";
import {mimeType} from './mime-type.validator';

@Component({
  templateUrl:'./quote-upsert.component.html',
  selector:'app-quote-upsert',
  styleUrls:['./quote-upsert.component.css']
})
export class QuoteUpsertComponent implements OnInit
{
  private quoteId:any='';
  private mode='create';
  private editQuote:any;
  imagePreview:string='';
  //private file: File | null = null;

  quoteForm:any;
  isLoading = false;
  //private quoteForm= new FormBuilder();

  constructor(
    private quoteService:QuotesService,
    private activedRoute:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder
  ){}
  ngOnInit(){
    // this.quoteForm=this.fb.group({
    //   id:[''],
    //   title:['',Validators.required,Validators.minLength(3)],
    //   content:[''],
    //   image:['',Validators.required]
    // })
    this.quoteForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, {
        validators:[Validators.required,Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators:[Validators.required,Validators.minLength(3)]
      }),
      image:new FormControl(null,
        {validators:[Validators.required],
        asyncValidators:[mimeType]})

    });
    this.activedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.quoteId=paramMap.get('id');
        this.isLoading=true;
        this.mode='edit';
        this.getQuoteById();
      }
    });
  }
  getQuoteById()
  {
    this.quoteService.getQuoteById(this.quoteId)
    .subscribe((res:any)=>{
      if(res){
        this.isLoading=false;
        this.quoteForm.setValue({
          id:res.id,
          title:res.title,
          content:res.content,
          image:res.image
        });
        this.imagePreview=res.image;
      }
    });
  }
  onSaveQuote()
  {
    if(this.quoteForm.invalid){
      return;
    }
    this.isLoading=true;
    if(this.mode==='create'){
      this.quoteService.addQuote(this.quoteForm.value,this.quoteForm.value.image);
    }
    else
    {
      this.quoteService.updateQuote(this.quoteForm.value,this.quoteForm.value.image)
      .subscribe(res=>{
        console.log('update quote back',res);
      })
    }
    this.isLoading=false;
    this.quoteForm.reset();
    this.router.navigate(['feed-admin/quote-list']);
  }
  onImagePicked(event:Event){
    //const file=(event.target as HTMLInputElement).files[0];
    const target = event.target as HTMLInputElement;
    // @ts-ignore
    const file = target.files[0];
    this.quoteForm.patchValue({image:file});
    this.quoteForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload=()=>{
      //@ts-ignore
      this.imagePreview=reader.result?.toString();
    };
    reader.readAsDataURL(file);
  }
  onDestroy(){
    this.editQuote.unsubscribe();
  }
}
