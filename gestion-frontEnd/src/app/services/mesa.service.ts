import { Injectable,Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//interfaces
import { IService } from '../interfaces/iservice';
import { IOpcionesHttp } from '../interfaces/iopciones-http';

//models
import { Mesa } from '../models/mesa';

@Injectable()
export class MesaService implements IService{

  private _url = environment.apiUrl ;

  constructor( 
    @Inject('IOpcionesHttp') private _opcionesHttp: IOpcionesHttp,
    private _http: Http) { }


  get(id:string){ 

    return this._http.get(`${this._url}/restaurant/${id}/mesa`, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }

  getTerminos(id:string,terminos:string){ 

    return this._http.get(`${this._url}/restaurant/${id}/mesa/${terminos}`, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }

  post(mesa:Mesa){ 
    return this._http.post(`${this._url}/mesa/`,mesa, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }

  
  put(mesa:Mesa){ 
    return this._http.put(`${this._url}/mesa/${mesa._id}/${mesa.pedidoActivo}`,mesa, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }
}