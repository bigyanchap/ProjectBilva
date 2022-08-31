import { FeedEndUserModule } from './pages/feed-enduser/feed-enduser.module';
import { ErrorComponent } from './pages/error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { AuthInterceptor } from './pages/auth/auth-interceptor';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './pages/header/header.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

import { AngularMaterialModule } from './angular-material.module';
import { FeedAdminModule } from './pages/feed-admin/feed-admin.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FeedAdminModule,
    FeedEndUserModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
