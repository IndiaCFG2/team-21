import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SchemeComponent } from './scheme/scheme.component';
import { MarketComponent } from './market/market.component'
import {AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  { path:'home',component:HomeComponent },
  {path:'scheme',component:SchemeComponent},
  {path:'market',component:MarketComponent},
  { path:"signin",component:SigninComponent },
  { path:"signup",component:SignupComponent },
  { path:"**", redirectTo:'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
