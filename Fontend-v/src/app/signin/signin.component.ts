import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService} from '../service/auth.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  logInfo : {mail_id:string , password:string};
  wrnMailPswd = false;
  constructor(private auth : AuthService, private router:Router ) { 
      
  }

  ngOnInit() {
    this.auth.loginStatus.subscribe((status)=>{
      if(status.success)
      {
        this.router.navigate(['browse'])
      }
    })
  }
 loginUser(logData :{email:string , password:string})
  {

    console.log(logData)

      this.auth.loginUser(logData).subscribe(
        (res:any) => {console.log(res)
          this.wrnMailPswd = false;
           localStorage.setItem('token',res.token)
           localStorage.setItem('name',res.name)
           this.auth.loginStatus.next({success:true,active:res.active,loaded:true});
        }  ,
        err=>{
          console.log(err)
          this.wrnMailPswd = true;
        }
      )
  }

}
