import { Injectable,Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//interfaces
import { IService } from '../interfaces/iservice';
import { IOpcionesHttp } from '../interfaces/iopciones-http';

//models
import { RegistroUsuario } from '../models/registroUsuario';


@Injectable()
export class UsuarioService implements IService{

  private _url = environment.apiUrl ;

  constructor( 
    @Inject('IOpcionesHttp') private _opcionesHttp: IOpcionesHttp,
    private _http: Http) { }


  post(registroUsuario:RegistroUsuario){

    return this._http.post(this._url + '/usuario', registroUsuario, this._opcionesHttp.getOptions())
      .map(res => {
           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {
      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }

  activarUsuario(idUsuario:string){

    return this._http.put(`${this._url}/usuario/activar/${idUsuario}`,{},  this._opcionesHttp.getOptions())
      .map(res => {
        return { ok: res.ok, code: res.status, message: res };
      }, err => {
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }
  validarEstadoUsuario(idUsuario:string){

    return this._http.get(`${this._url}/usuario/${idUsuario}`,  this._opcionesHttp.getOptions())
      .map(res => {
        return { ok: res.ok, code: res.status, message: res };
      }, err => {
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }

  
guardarUsuario(usuario){   
    localStorage.setItem('usuario',JSON.stringify(usuario));
   
}

obtenerUsuario(){
    var usuario=JSON.parse( localStorage.getItem('usuario'));      
    return(usuario);
}

borrarUsuario(){
  localStorage.removeItem('usuario');
  localStorage.clear();
}


}