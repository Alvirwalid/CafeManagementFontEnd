import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./share/material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ShareModule} from "./share/share/share.module";
import { FullComponent } from './layouts/full.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidenaveComponent } from './layouts/sidenave/sidenave.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BestSallerComponent } from './best-saller/best-saller.component';
import {HttpClientModule} from "@angular/common/http";
import { SignupComponent } from './signup/signup.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER} from "ngx-ui-loader";


const ngxUiLoaderConfig:NgxUiLoaderConfig={
  text:'Loading...',
  textColor:'#FFFFFFF',
  textPosition:'center-center',
  bgsColor:'#7b1fa2',
  fgsColor:'#7b1fa2',
  fgsSize:100,
  fgsType:SPINNER.squareJellyBox,
  hasProgressBar:false
}


@NgModule({
  declarations: [

    AppComponent,
    FullComponent,
    HeaderComponent,
    SidenaveComponent,
    HomeComponent,
    // DashboardComponent,
    BestSallerComponent,
    SignupComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ShareModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
