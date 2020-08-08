import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../service/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  mailTaken = false;
  mailInvalid = false
  phntaken =false;

  constructor(private auth : AuthService,private router :Router ) {
    
   }
  ngOnInit() {
    this.auth.loginStatus.subscribe((status)=>{
      if(status.success)
      {
        this.router.navigate(['browse'])
      }
    })
  }

  blockSpecialChar(e)
  {
    var k;
        document.all ? k = e.keyCode : k = e.which;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32);
  }

  blockAlpha(e)
  {
    var k;
        document.all ? k = e.keyCode : k = e.which;
        return ( (k >= 48 && k <= 57));
  }

  regUser(regdata :{name:string,email:string,password:string,phone:string} )
  {
        this.auth.registerUser(regdata)
        .subscribe(
          (res:any) => { console.log(res)
             localStorage.setItem('token',res.token)
             var name = regdata.name;
             if(name.charCodeAt(0)>=97)
             {
                 name = String.fromCharCode(name.charCodeAt(0)-32) + name.substring(1,name.length) ;
             }    
             localStorage.setItem('name',name)
             this.auth.loginStatus.next({ success:true,active:false,loaded:true });
          }  ,
          err => {
            console.log(err.error);
            if(err.error.message="phone number already in use")
            {
                this.phntaken = true;
                setTimeout(() => {
                  this.phntaken = false;
                }, 8000);
            }
           else if(err.error.message="Email already in use")
            {
                this.mailTaken = true;
                setTimeout(() => {
                  this.mailTaken = false;
                }, 8000);
            }
          }
        )
  }

}
