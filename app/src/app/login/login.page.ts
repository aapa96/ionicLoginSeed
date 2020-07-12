import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../services/resources';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public credentials:any;
  constructor(private resources:ResourcesService) {
    this.credentials = {};
  }

  ngOnInit() {
  }
  loginApp(){
    this.resources.login(this.credentials).subscribe((result:any)=>{
      result.userStatus == "ENABLED"  ? this.resources.setTokenToLocalStorage(result['user-token']) : null;
      window.location.replace('/');
    },(err)=>{
      console.log(err);
    })
  }
}
