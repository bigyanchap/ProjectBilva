import { Injectable } from "@angular/core";
import { Post, _Post } from "../../../models/post.model";
import {Observable, Subject} from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class PostsService{
  apiUrl=environment.apiUrl+"posts/";
  private posts:Post[]=[];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http:HttpClient){

  }
  getPosts(){
    this.http.get<{message:string,posts:_Post[]}>(this.apiUrl)
    .pipe(map((postData)=>{
      return postData.posts.map(post=>{
        console.log(post);
        return {
          title:post.title,
          content:post.content,
          id:post._id,
          creator:post.creator
        }
      });
    }))
    .subscribe((transformedPost)=>{
      this.posts=transformedPost;
      this.postsUpdated.next([...this.posts]);
    });
  }
  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPostById(postId:string)
  {
    // let val={...this.posts.find(p=>p.id===postId)}
    // return val;
    return this.http.get(this.apiUrl+postId);
  }

  addPost(post:Post){
    //const post_: Post={id: post.id,title:post.title, content:post.content};
    this.http.post<{message:string,id_:string}>(this.apiUrl,post)
      .subscribe((responseData)=>{
        post.id=responseData.id_;
        //The post-back from mongoose can update the empty id string.
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
  updatePost(post:Post){
    return this.http.put<{message:string}>(this.apiUrl+post.id,post);
  }
  deletePost(postId:string){
    return this.http.delete(this.apiUrl+postId).subscribe(()=>{
      const updatedPosts=this.posts.filter(post=> post.id!==postId);
      this.posts=updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
