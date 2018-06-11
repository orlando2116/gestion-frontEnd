import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

//autorizador
import { Autorizador } from '../../dependencies/autorizador';
import { Iautorizador } from '../../interfaces/iautorizador';

//servicios
import { TokenService } from '../../services/token.service';
import { AutorizadorService } from '../../services/autorizador.service';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              @Inject('IAutorizador') private autorizador: Iautorizador,
              private _tokenService:TokenService,
              private _autorizadorService:AutorizadorService,
              private _usuarioService:UsuarioService,
              private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit( ) {
  }

  cerrarSesion(){
    this._spinnerService.show();
   
    this._tokenService.borrarToken();
    this._autorizadorService.borrarAutorizador();
    this._usuarioService.borrarUsuario();

    setTimeout(() => {
      this.autorizador.Logueado=false;
      this.router.navigate(['/home']);
      this._spinnerService.hide();
    }, 4000);
   
  }
}
