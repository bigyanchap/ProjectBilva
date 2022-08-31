import { NgModule } from "@angular/core";

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../auth/auth.guard";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { QuoteListComponent } from "./quotes/quote-list/quote-list.component";
import { QuoteUpsertComponent } from "./quotes/quote-upsert/quote-upsert.component";

 const routes: Routes = [
  {
    path:'post-edit/:id',
    component: PostCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'post-create',
    component: PostCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'post-list',
    component: PostListComponent
  },
  {
    path:'quote-upsert',
    component: QuoteUpsertComponent
  },
  {
    path:'quote-upsert/:id',
    component: QuoteUpsertComponent
  },
  {
    path:'quote-list',
    component: QuoteListComponent
  },
];
@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class FeedAdminRoutingModule{}
