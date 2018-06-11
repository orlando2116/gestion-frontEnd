import { Injectable,Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AutorizadorService {



  constructor( ) { }  

  guardarAutorizador(logueado){   
      localStorage.setItem('logueado',logueado);
   
  }

  obtenerAutorizador():boolean{
      var autorizado=JSON.parse(localStorage.getItem('logueado'));
      return(autorizado);
    
  }

  borrarAutorizador(){
    localStorage.removeItem('logueado');
    localStorage.clear();
  }
}