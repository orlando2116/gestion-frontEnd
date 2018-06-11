import { Injectable } from '@angular/core';
import { Iautorizador } from '../interfaces/iautorizador';
import { AutorizadorService } from '../services/autorizador.service';

@Injectable()
export class Autorizador implements Iautorizador {
    
    public Logueado:boolean=false;

    constructor(private _autorizadorService:AutorizadorService){
       this.Logueado=this._autorizadorService.obtenerAutorizador();
     
    }
}
