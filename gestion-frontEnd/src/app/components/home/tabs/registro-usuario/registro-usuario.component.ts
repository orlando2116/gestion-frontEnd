import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//models
import {RegistroUsuario} from '../../../../models/registroUsuario';

//services
import { UsuarioService } from '../../../../services/usuario.service';



@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  private registroUsuario=new RegistroUsuario();
  private validaPassword:string='';

  private registrando:boolean=false;


  constructor(private _usuarioService:UsuarioService,private _toastrService: ToastrService) { }

  ngOnInit() {
  }

  registrarUsuario(){
   
    if(this.validarCampos()){
      this.registrando=true;

      this._usuarioService.post(this.registroUsuario)
      .subscribe(data => {
        setTimeout(() => {
          this.registrando=false;
          this._toastrService.success('Usuario Registrado con éxito.', 'Registro');  
        }, 1000);
     
      },
      error => {   
        this.registrando=false;   
       this._toastrService.info(error.json().err.message, 'Ingreso al Sistema');  
      });
    }
   
  }

  validarCampos(){
    if(this.registroUsuario.password==='' || this.registroUsuario.email==='' 
    || this.registroUsuario.nombre==='' || this.validaPassword===''){
        this._toastrService.info('Ingrese todos los campos', 'Registro Usuario');
        return false;;
    }

    if(this.validaPassword!==this.registroUsuario.password){
      this._toastrService.info('Contraseñas Distintas', 'Registro Usuario');
      return false;
    }

    return true;
  }
}
