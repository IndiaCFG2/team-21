import { Component,OnInit } from '@angular/core';
import {Router,ActivatedRoute,RouterState,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router'
import { AuthService } from './service/auth.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'i2i';
  constructor(private router:Router,private auth:AuthService, private route:ActivatedRoute){
     this.loggedIn =  AuthService.userLogginedIn;
  }
  currentRoute="";
  loggedIn = false;
  active = false;
  loaded = false;
  showSignin = false;
  showSignup = false;
  userName =  null;
  userDP = null
  ngOnInit()
  {
   this.router.events.subscribe( rout => {
      this.currentRoute = window.location.href.split('/')[3]
      if(this.currentRoute=='signup'){this.showSignup = true;this.showSignin = false; }
      else if(this.currentRoute=='signin')this.showSignin = true,this.showSignup = false;
      else { this.showSignin = false,this.showSignup = false }
    })

    this.auth.loginStatus.subscribe( (value:any)=>{
      console.log(value)
      this.loaded = value.loaded
      this.active = value.active
      this.loggedIn = value.success;

    })

    this.auth.userDetails.subscribe((value:any)=>{
     // console.log(value)
      this.userDP = value.displayPicture
      this.userName = value.name
    })
    this.auth.verifyUser();
  }

  goToSignup()
  {
    this.router.navigate(['signup'])
  }
  goToSignIn()
  {
    this.router.navigate(['signin'])
  }
  goToBrowse()
  {
    this.router.navigate(['browse'])
  }
  
  logout()
  {
    localStorage.clear();
    this.auth.loginStatus.next({success:false,active:false,loaded:true});
    this.router.navigate(['browse'])
  }

  goToAccount(){
    this.router.navigate(['account'])
  }

}
