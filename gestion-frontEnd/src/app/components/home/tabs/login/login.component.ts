import { Component, OnInit,Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//models
import {Usuario} from '../../../../models/usuario';

//services
import { LoginService } from '../../../../services/login.service';

//autorizador
import { Autorizador } from '../../../../dependencies/autorizador';
import { Iautorizador } from '../../../../interfaces/iautorizador';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuario=new Usuario();
  private iniciandoSesion:boolean=false;

  constructor(private _loginService:LoginService,
    @Inject('IAutorizador') private autorizador: Iautorizador,
   private _toastrService: ToastrService) { }

  ngOnInit() {
  }

  inicarSesion(){
    this.iniciandoSesion=true;

    this._loginService.post(this.usuario)
        .subscribe(data => {
        const res=data.message.json();
        
          setTimeout(() => {
            this.iniciandoSesion=false;
            this.autorizador.Logueado=true;
            this._toastrService.success(res.usuario.nombre, 'Bienvenido');
          }, 1000);
       
        },
        error => {
          this.iniciandoSesion=false;
         this._toastrService.info(error.json().err.message, 'Ingreso al Sistema');
        this.autorizador.Logueado=false;
        });
  }

  cerrarSesion(){
    this.autorizador.Logueado=false;
  }
}
