import { Injectable,Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//interfaces
import { IService } from '../interfaces/iservice';
import { IOpcionesHttp } from '../interfaces/iopciones-http';

//models
import { Pedido } from '../models/pedido';

@Injectable()
export class PedidoService implements IService{

  private _url = environment.apiUrl ;

  constructor( 
    @Inject('IOpcionesHttp') private _opcionesHttp: IOpcionesHttp,
    private _http: Http) { }
  
    get(id:string){ 

      return this._http.get(`${this._url}/restaurant/${id}/pedido`, this._opcionesHttp.getOptions())
        .map(res => {           
          return { ok: res.ok, code: res.status, message: res };
        }, err => {      
          return Observable.throw({ ok: false, code: err.status, message: err.json() });
        });
    }
    getByMesa(id:string,idMesa:string){ 

      return this._http.get(`${this._url}/restaurant/${id}/mesa/${idMesa}/pedido`, this._opcionesHttp.getOptions())
        .map(res => {           
          return { ok: res.ok, code: res.status, message: res };
        }, err => {      
          return Observable.throw({ ok: false, code: err.status, message: err.json() });
        });
    }


  post(pedido:Pedido){ 

    return this._http.post(`${this._url}/pedido`,pedido, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }

  put(pedido:Pedido){ 

    return this._http.put(`${this._url}/pedido/${pedido._id}`,pedido, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }
    
  
  /*put(plato){ 

    return this._http.put(`${this._url}/plato/${plato._id}`,plato, this._opcionesHttp.getOptions())
      .map(res => {           
        return { ok: res.ok, code: res.status, message: res };
      }, err => {      
        return Observable.throw({ ok: false, code: err.status, message: err.json() });
      });
  }*/
  
}