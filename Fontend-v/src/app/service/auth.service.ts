import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static userLogginedIn = false;
  constructor(private http:HttpClient) { }

  loginUser(x){
    //console.log(x)
   return this.http.post(environment.baseUrl+'auth/signin',x)
  }
  registerUser(x){
    return this.http.post(environment.baseUrl+'auth/signup',x)
  }

  loginStatus = new BehaviorSubject<any>({success:false,active:false});
  userDetails = new BehaviorSubject<any>({name:null,displayPicture:null});
  verifyUser()
  {
    this.http.post(environment.baseUrl+'auth/verify',{}).subscribe(
      (res:any)=>{
          AuthService.userLogginedIn = res.success;
          this.loginStatus.next({ success: res.success , active:res.active,loaded:true})  
          this.userDetails.next({ name:res.name , displayPicture:res.displayPicture })        
      }
    )
  }
}
