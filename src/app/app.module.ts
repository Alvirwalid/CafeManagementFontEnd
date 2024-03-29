import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./share/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ShareModule} from "./share/share.module";
import { FullComponent } from './layouts/full.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SideNaveComponent } from './layouts/sidenave/side-nave.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BestSallerComponent } from './best-saller/best-saller.component';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import { SignupComponent } from './signup/signup.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER} from "ngx-ui-loader";
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import {tokenInterceptorInterceptor} from "./service/token-interceptor.interceptor";
import {MatSidenavModule} from "@angular/material/sidenav";


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
    SideNaveComponent,
    HomeComponent,
    // DashboardComponent,
    BestSallerComponent,
    SignupComponent,
    ForgotpasswordComponent,
    LoginComponent,


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
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatSidenavModule,

  ],
  providers: [
    provideAnimationsAsync(),
    HttpClientModule,
    provideHttpClient(
      withInterceptors([tokenInterceptorInterceptor])
    )
    // {provide:HTTP_INTERCEPTORS,useClass:HttpInterceptorFn,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
