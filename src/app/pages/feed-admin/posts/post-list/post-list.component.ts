import { AuthService } from './../../../auth/auth.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../../../../models/post.model';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  posts:Post[]=[];
  userIsAuthenticated=false;
  userId:string|null='';
  //private postsSub:Subscription=new Subscription();
  private authStatusSubscription:Subscription=new Subscription();
  constructor(
    private postsService:PostsService,
    private authService:AuthService
    )
  {

  }
  ngOnInit()
  {
    this.postsService.getPosts();
    this.userId=this.authService.getUserId();
    this.postsService.getPostUpdateListener()
      .subscribe((posts:Post[])=>{
        this.posts=posts;
      });
      this.userIsAuthenticated=this.authService.getIsAuth();
      this.authStatusSubscription=
        this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated=>{
          this.userIsAuthenticated=isAuthenticated;
          this.userId=this.authService.getUserId();
        });
  }

  onDelete(postId:string){
    this.postsService.deletePost(postId);

  }
  ngOnDestroy(): void {
     this.authStatusSubscription.unsubscribe();
  }//avoids memory leaks
}
