import { Component } from '@angular/core';
import { ResourcesService } from '../services/resources';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private resource:ResourcesService,private router:Router) {
    console.log(this.resource.token);
  }
  goLogin(){
    this.router.navigate(["login"]);
  }
  logout(){
    this.resource.logout();
  }
}
