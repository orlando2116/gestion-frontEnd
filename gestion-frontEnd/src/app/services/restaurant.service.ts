import { Injectable,Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//interfaces
import { IService } from '../interfaces/iservice';
import { IOpcionesHttp } from '../interfaces/iopciones-http';
//models
import { Restaurant } from '../models/restaurant';


//service
import {TokenService} from './token.service';
import { UsuarioService } from './usuario.service';

@Injectable()
export class RestaurantService implements IService{

  private _url = environment.apiUrl ;

  constructor( 
    @Inject('IOpcionesHttp') private _opcionesHttp: IOpcionesHttp,
    private _http: Http,
    private _tokenService:TokenService,
    private _usuarioService:UsuarioService) { }


  get(estado:boolean){   
    let usuario=this._usuarioService.obtenerUsuario();


    return this._http.get(`${this._url}/usuario/${usuario._id}/restaurant/${estado}`, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }

  post(restaurant:Restaurant){   
    let usuario=this._usuarioService.obtenerUsuario();
  
    restaurant.usuario=usuario._id;

    return this._http.post(`${this._url}/restaurant`,restaurant, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }

  put(restaurant){   


    return this._http.put(`${this._url}/restaurant/${restaurant._id}`,restaurant, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }

}