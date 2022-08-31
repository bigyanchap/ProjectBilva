import { AuthService } from './../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormBuilder, FormsModule,FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Route, Router } from "@angular/router";
import { Post, _Post } from "../../../../models/post.model";
import { PostsService } from "../post.service";
@Component({
  templateUrl:'./post-create.component.html',
  selector:'app-post-create',
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent implements OnInit,OnDestroy
{
  private postId:any='';
  private mode='create';
  private editPost:any;
  private authStatusSubscription:Subscription=new Subscription();
  postForm:any;
  isLoading = false;

  constructor(
    private postService:PostsService,
    private activedRoute:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private authService:AuthService
  ){}

  ngOnInit(){
    this.authStatusSubscription=this.authService
    .getAuthStatusListener().subscribe(authStatus=>{
      this.isLoading=false;
    });
    this.postForm=this.fb.group({
      id:[''],
      title:[''],
      content:['']
    })

    this.activedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.postId=paramMap.get('id');
        this.isLoading=true;
        this.mode='edit';
        this.postService.getPosts();
        this.postService.getPostUpdateListener()
        .subscribe(res=>{
          this.isLoading=false;
          this.getPostById();
        })
      }
    });
  }
  getPostById()
  {
    this.postService.getPostById(this.postId)
    .subscribe(res=>{
      if(res){
        this.postForm.setValue(res);
      }
    })
  }
  onSavePost()
  {
    this.isLoading=true;
    if(this.mode==='create'){
      this.postService.addPost(this.postForm.value);
    }
    else
    {
      this.postService.updatePost(this.postForm.value)
      .subscribe(res=>{
        console.log('update post back',res);
      })
    }
    this.isLoading=false;
    this.router.navigate(['feed-admin/post-list']);
  }
  onDestroy(){
    this.editPost.unsubscribe();
  }
  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
