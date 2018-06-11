import { Injectable,Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//interfaces
import { IService } from '../interfaces/iservice';

//models
import { Usuario } from '../models/usuario';

//services
import {TokenService} from './token.service';
import { AutorizadorService } from './autorizador.service';
import { UsuarioService } from './usuario.service';

@Injectable()
export class LoginService implements IService{

  private _url = environment.apiUrl ;

  constructor( private _http: Http, 
    private _tokenService:TokenService,
    private _autorizadorService:AutorizadorService,
    private _usuarioService:UsuarioService) { }


  post(usuario:Usuario){
    let headers = new Headers({ 'Content-type': 'Application/json' });
    return this._http.post(this._url + '/login', usuario, { headers })
      .map(res => {
     
        
      this._usuarioService.guardarUsuario(res.json().usuario);
      this._tokenService.guardarToken(res.json().token);
      this._autorizadorService.guardarAutorizador(true);
      
        return { ok: res.ok, code: res.status, message: res };
      }, err => {
      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }

}
