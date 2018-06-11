import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//services
import { PlatoService } from '../../../../services/plato.service';
import { TipoPlatoService } from '../../../../services/tipo-plato.service';
import { PedidoService } from '../../../../services/pedido.service';

//models
import { TipoPlato } from '../../../../models/tipoPlato';
import { Plato } from '../../../../models/plato';
import { Restaurant } from '../../../../models/restaurant';
import { Mesa } from '../../../../models/mesa';
import { Pedido } from '../../../../models/pedido';

@Component({
  selector: 'app-gestion-pedido',
  templateUrl: './gestion-pedido.component.html',
  styleUrls: ['./gestion-pedido.component.css']
})
export class GestionPedidoComponent implements OnInit {
  
//restaurtant de URL
   private restaurant:Restaurant=new Restaurant();
  
   //mesa que se hara pedido
   @Input() mesa: Mesa;
   //platos agregados
   @Output() AgregarPlato: EventEmitter<any> = new EventEmitter<any>();
    
     //agregar pedido
  @Output() AgregarPedido: EventEmitter<any> = new EventEmitter<any>();


   //platos y tipos platos listas
   private tiposPlato:TipoPlato[]=[];
   private platos:Plato[]=[];
   
   //terminos tipos de plato
   private terminosTipoPlato:string='';
   
   //tipo de plato seleccionado
   private tipoPlato:TipoPlato=new TipoPlato();
   

   //lista platos pedidos
   private platosPedido:Plato[]=[];
  //total
  private total:number=0;
  
  private guardando:boolean=false;
  
  private pedido:Pedido=new Pedido();
  
  private pedidoGuardado:boolean=false;

   constructor(private route: ActivatedRoute,
              private _toastrService: ToastrService,
              private modalService: NgbModal,
              private _tipoPlatoService:TipoPlatoService,
              private _pedidoService:PedidoService) { }
 
   ngOnInit() {
     this.route.params.subscribe(params => {
       this.restaurant = JSON.parse(params['parameter']);
      });  
      this.buscarTiposPlato();
   }

   ngOnChanges(){
  }
 
   openVerticallyCentered(content) {
    const modalRef=this.modalService.open(content, {  size: 'lg' });

    modalRef.result.then((data) => {
      this.pedidoGuardado=false;
    }, (reason) => {
      this.pedidoGuardado=false;
    });
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
     this._tipoPlatoService.getTerminos(this.restaurant._id,this.terminosTipoPlato)
     .subscribe(data => {       
      this.tiposPlato=data.message.json().tipoPlato;  
     },
     error => {
       this._toastrService.info(error.json().err.message, 'tipos platos');     
     });
   }
 
   buscarTerminoTipoPlato(){
     if(this.terminosTipoPlato===''){
       this.buscarTiposPlato();
     }else{
       this.buscarTiposPlatoPorTermino();
     }
   }

  seleccionarTipoPlato(tipoPlato:TipoPlato){
    this.tipoPlato=tipoPlato;
  }

  agregarPlato(item){
    this.platosPedido.push(item);
    this.cargarTotal();
  }

  guardarPedido(){
    this.guardando=true;

    this.pedido.mesa=this.mesa._id;
    this.pedido.precio=this.total;
    this.pedido.restaurant=this.restaurant._id;
    let platos:string[]=[];

    for(let item of this.platosPedido){
      platos.push(item._id);
    }

   this.pedido.plato=platos;
  
   this._pedidoService.post(this.pedido)
   .subscribe(data => {    
    setTimeout(() => {
      this.AgregarPedido.emit(this.mesa);
      this.pedidoGuardado=true;
      this.platosPedido=[];
      this.total=0;
      this.guardando=false;
      this._toastrService.success('Pedido Guardado', 'Pedido');     
    }, 1000);

   },
   error => {
    setTimeout(() => {
      this.AgregarPedido.emit(false);
      this.guardando=false;
      this._toastrService.info(error.json().err.message, 'tipos platos');     

    }, 1000);
   });   
  }

  cargarTotal(){
    this.total=0;
    for(let item of this.platosPedido){
    this.total=this.total+item.precio;
    }
  }
}
