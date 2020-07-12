import { Injectable } from '@angular/core';
// Router => para navegar a otras paginas mediante codigo
// CanActivate => interface que retorna true o false
//                permitiendo el acceso al usuario
import {Router, CanActivate} from '@angular/router';
import { ResourcesService } from './resources';

@Injectable({
  providedIn: "root"
})
export class GuardAuthServiceWithSession implements CanActivate{

  constructor(private resources:ResourcesService,
              private _router:Router) { }
  canActivate(){  
    if(this.resources.getTokenToLocalStorage() != null ){ 
        return true;
    }else{
      this._router.navigate(["login"])
        return false;
    }
  }
} 