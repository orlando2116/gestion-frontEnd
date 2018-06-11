import { Injectable,Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TokenService {

  private token;

  constructor( ) { }  

  guardarToken(token:string){   
      localStorage.setItem('token',token);
      this.token=token;   
  }

  obtenerToken(){
      var token=localStorage.getItem('token');      
      return(token);
  }

  borrarToken(){
    localStorage.removeItem('token');
    localStorage.clear();
  }
}