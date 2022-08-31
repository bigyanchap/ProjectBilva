import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../angular-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { QuoteListComponent } from './quotes/quote-list/quote-list.component';
import { QuoteUpsertComponent } from './quotes/quote-upsert/quote-upsert.component';
import { FeedAdminRoutingModule } from "./feed-admin-routing.module";

@NgModule({
  declarations:[
    PostCreateComponent,
    PostListComponent,
    QuoteUpsertComponent,
    QuoteListComponent,
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FeedAdminRoutingModule
  ]
})
export class FeedAdminModule{

}
