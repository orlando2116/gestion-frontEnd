import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

//services/
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-activar-usuario',
  templateUrl: './activar-usuario.component.html',
  styleUrls: ['./activar-usuario.component.css']
})
export class ActivarUsuarioComponent implements OnInit {

  private registrado:boolean=false;

  constructor(private _activatedRouter:ActivatedRoute,
              private _usuarioService:UsuarioService,
              private _toastrService: ToastrService,
              private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this._activatedRouter.params.subscribe(params => {
      const parametros = params['parameter'];
      let idUsuario:string =atob(parametros);
      this._spinnerService.show();

      this.validarEstadoUsuario(idUsuario)
      .then(res=>{
        if(res){
          //usuario ya activado
          this._toastrService.info(`usuario ya activado`, 'Usuario'); 
          this._spinnerService.hide();
          return;  
        }
        //activamos el usuario
        this.activarUsuario(idUsuario);
      },err=>{
        console.log(err);
      });
   
    });
  }

   validarEstadoUsuario(idUsuario:string){

    return new Promise((resolve, reject) => {
      this._usuarioService.validarEstadoUsuario(idUsuario)
        .subscribe(data => {    
          resolve(data.message.json().usuario.estado);

        },
        error => {         
          reject(error); return;
        });

       
      });
    }  

    activarUsuario(idUsuario:string){
      this._usuarioService.activarUsuario(idUsuario)
      .subscribe(data => {    
      let usuario=data.message.json().usuario.nombre;

        setTimeout(() => {
          this._toastrService.info(`usuario ${usuario} activado`, 'Usuario');   
          this._spinnerService.hide();  
          this.registrado=true;
        }, 1000);
      },
      error => {
        this._toastrService.info(error.json().err.message, 'Usuario');     
        this._spinnerService.hide();
      });
    }
}
