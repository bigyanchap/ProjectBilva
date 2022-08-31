import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';

import { FeedsEUComponent } from "./feeds-eu/feeds-eu.component";


@NgModule({
  declarations:[
    FeedsEUComponent
  ],
  imports:[
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class FeedEndUserModule{

}
