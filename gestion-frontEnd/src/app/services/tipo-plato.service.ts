import { Injectable,Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//interfaces
import { IService } from '../interfaces/iservice';
import { IOpcionesHttp } from '../interfaces/iopciones-http';

//models
import { TipoPlato } from '../models/tipoPlato';

@Injectable()
export class TipoPlatoService implements IService{

  private _url = environment.apiUrl ;

  constructor( 
    @Inject('IOpcionesHttp') private _opcionesHttp: IOpcionesHttp,
    private _http: Http) { }


  get(id:string){ 

    return this._http.get(`${this._url}/restaurant/${id}/tipoPlato`, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }
  getTerminos(id:string,terminos:string){ 

    return this._http.get(`${this._url}/restaurant/${id}/tipoPlato/${terminos}`, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }
  

  post(tipoPlato:TipoPlato){ 
    return this._http.post(`${this._url}/tipoPlato`,tipoPlato, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }
}