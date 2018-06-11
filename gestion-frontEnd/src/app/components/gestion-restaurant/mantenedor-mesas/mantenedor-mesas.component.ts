import { Component, Inject, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

//models
import { Restaurant } from '../../../models/restaurant';
import { Mesa } from '../../../models/mesa';

//services
import { MesaService } from '../../../services/mesa.service';

@Component({
  selector: 'app-mantenedor-mesas',
  templateUrl: './mantenedor-mesas.component.html',
  styleUrls: ['./mantenedor-mesas.component.css']
})
export class MantenedorMesasComponent implements OnInit {
  
  @Output() AgregarMesa: EventEmitter<any> = new EventEmitter<any>();

  private restaurant:Restaurant=new Restaurant();
  
  private mesas:Mesa[]=[];
  
  private terminos:string='';
  
  //gestionan pedido
  private gestionPedido:boolean=false;
  
  //agregar pedido
  @Output() AgregarPedido: EventEmitter<any> = new EventEmitter<any>();

  @Output() FinalizarPedido: EventEmitter<any> = new EventEmitter<any>();

  
  constructor(private route: ActivatedRoute,
              private _mesaService:MesaService,
              private _toastrService: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
     this.restaurant = JSON.parse(params['parameter']);
    });  
    this.buscarMesas();
  }

  buscarMesas(){
    this._mesaService.get(this.restaurant._id)
      .subscribe(data => {       
       this.mesas=data.message.json().mesa;  
      },
      error => {
        this._toastrService.info(error.json().err.message, 'Mesas');     
      });
  }

  buscarMesasPorTermino(){
    this._mesaService.getTerminos(this.restaurant._id,this.terminos)
      .subscribe(data => {       
       this.mesas=data.message.json().mesa;  
      },
      error => {
        this._toastrService.info(error.json().err.message, 'Mesas');     
      });
  }

  agregarMesa(item) {
    if(item){
      this.buscarMesas();
    }  
  }  

  buscarTermino(){
    if(this.terminos===''){
      this.buscarMesas();
    }else{
      this.buscarMesasPorTermino();
    }
  }

  gestionarPedido(){
    this.gestionPedido=true;
  }

  agregarPedido(item){
    if(!item){
      //si hubo un error
      return;
    }
    console.log(item);
    let mesa:Mesa=item;
    this.cambiarPedidoActivo(mesa,true);
    //si salio todo bn, se edita mesa, indicando que ya tiene un pedido tomado
  }

  finalizarPedido(item){
    if(!item){
      //si hubo un error
      return;
    }
    console.log("llego");
    let mesa:Mesa=item;
    this.cambiarPedidoActivo(mesa,false);
  }

  cambiarPedidoActivo(mesa:Mesa,estado){
    mesa.pedidoActivo=estado;
    this._mesaService.put(mesa)
    .subscribe(data => {       
      this.buscarTermino();
    },
    error => {
      this._toastrService.info(error.json().err.message, 'Mesas');     
    });
  }

 
}
