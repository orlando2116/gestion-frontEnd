import { Injectable, Inject } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { IOpcionesHttp } from '../../interfaces/iopciones-http';

//services
import {TokenService} from '../token.service';

@Injectable()
export class OpcionesHttp implements IOpcionesHttp {
  constructor(    private _tokenService:TokenService ) { }

  getOptions() {
    return new RequestOptions({
      headers: new Headers({
        'token':  this._tokenService.obtenerToken(),
        'Content-Type': 'application/json'
      })
    });
  }

  getOptionsBy(parameter: any) {
    return new RequestOptions({
      headers: new Headers({
        'token':  this._tokenService.obtenerToken(),
        'Content-Type': 'application/json'
      }),
      search: parameter
    });
  }
}
