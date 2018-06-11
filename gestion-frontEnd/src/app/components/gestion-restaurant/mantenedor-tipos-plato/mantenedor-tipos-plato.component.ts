import { Component, Inject, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//models
import {TipoPlato} from '../../../models/tipoPlato';
import {Restaurant} from '../../../models/restaurant';

//services
import {TipoPlatoService} from '../../../services/tipo-plato.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-mantenedor-tipos-plato',
  templateUrl: './mantenedor-tipos-plato.component.html',
  styleUrls: ['./mantenedor-tipos-plato.component.css']
})
export class MantenedorTiposPlatoComponent implements OnInit {

  @Output() AgregarTipoPlato: EventEmitter<any> = new EventEmitter<any>();
  @Output() ObtenerTipoPlato: EventEmitter<any> = new EventEmitter<any>();

  private tipoPlato:TipoPlato=new TipoPlato();

  private restaurant:Restaurant=new Restaurant();
  private tiposPlato:TipoPlato[]=[];
  
  private terminos:string='';

  constructor(private _tipoPlatoService:TipoPlatoService,
              private route: ActivatedRoute,
              private _toastrService: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = JSON.parse(params['parameter']);
     });  
     this.buscarTiposPlato();

  }

  buscarTiposPlato(){
    this._tipoPlatoService.get(this.restaurant._id)
      .subscribe(data => {       
       this.tiposPlato=data.message.json().tipoPlato;  
      },
      error => {
        this._toastrService.info(error.json().err.message, 'tipos platos');     
      });
  }

  buscarTiposPlatoPorTermino(){
    this._tipoPlatoService.getTerminos(this.restaurant._id,this.terminos)
      .subscribe(data => {       
       this.tiposPlato=data.message.json().tipoPlato;  
      },
      error => {
        this._toastrService.info(error.json().err.message, 'tipos platos');     
      });
  }

  agregarTipoPlato(item) {
    if(item){
      this.buscarTiposPlato();
    }     
  } 

  buscarPlatos(tipoPlato:TipoPlato){
    this.ObtenerTipoPlato.emit(tipoPlato);
  }

  buscarTermino(){
    if(this.terminos===''){
      this.buscarTiposPlato();
    }else{
      this.buscarTiposPlatoPorTermino();
    }
  }
}
