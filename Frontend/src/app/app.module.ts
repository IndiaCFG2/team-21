import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import {MatRippleModule} from '@angular/material/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgChatModule } from 'ng-chat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TokenInterceptorService} from './service/token-interceptor.service';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
import { ArticleComponent } from './article/article.component';
import { QueryComponent } from './query/query.component';
import { SchemeComponent } from './scheme/scheme.component';
import { MarketComponent } from './market/market.component';
import { KhubComponent } from './khub/khub.component';
import { SellComponent } from './sell/sell.component';
import { BuyComponent } from './buy/buy.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    VideoComponent,
    ArticleComponent,
    QueryComponent,
    SchemeComponent,
    MarketComponent,
    KhubComponent,
    SellComponent,
    BuyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,YouTubePlayerModule,NgChatModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
