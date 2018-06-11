import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//models
import { TipoPlato } from '../../../../models/tipoPlato';
import { Restaurant } from '../../../../models/restaurant';
import { Mesa } from '../../../../models/mesa';
import { Plato } from '../../../../models/plato';
import { Pedido } from '../../../../models/pedido';

//services
import { TipoPlatoService } from '../../../../services/tipo-plato.service';
import { PedidoService } from '../../../../services/pedido.service';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit {
  
  //mesa que se editara pedido
  @Input() mesa: Mesa;

  //platos agregados
  @Output() AgregarPlato: EventEmitter<any> = new EventEmitter<any>();
  
  //obtenemos total
  @Output() ObtenerTotal: EventEmitter<any> = new EventEmitter<any>();
     

  //restaurtant de URL
  private restaurant:Restaurant=new Restaurant();
  
   //platos y tipos platos listas
   private tiposPlato:TipoPlato[]=[];
  
   //terminos tipo plato
   private terminosTipoPlato:string='';

   //tipo de plato seleccionado
   private tipoPlato:TipoPlato=new TipoPlato();
  
  //lista platos pedidos
  private platosPedido:Plato[]=[];
  
   //total
   private total:number=0;
  
   private guardando:boolean=false;

   //pedido editando
   private pedido:Pedido=new Pedido();

  constructor(private modalService: NgbModal,
              private _tipoPlatoService:TipoPlatoService,
              private _pedidoService:PedidoService,
              private route: ActivatedRoute,
              private _toastrService: ToastrService) { }
    
    

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = JSON.parse(params['parameter']);
     });  
   //  this.buscarTiposPlato();
  //  this.buscarPlatosDelPedido();
  }

  
  openVerticallyCentered(content) {
    const modalRef=this.modalService.open(content, {  size: 'lg' });
  
    this.buscarTiposPlato();
    this.buscarPlatosDelPedido();

    modalRef.result.then((data) => {
    
    }, (reason) => {
    
    });
  }

  buscarPlatosDelPedido(){
    this._pedidoService.getByMesa(this.restaurant._id,this.mesa._id)
    .subscribe(data => {      
     var datos=data.message.json().pedido[0];
      console.log(datos);
     if(datos!==undefined){
      this.platosPedido=datos.plato;  
      this.pedido._id=datos._id;
      this.cargarTotal();
     } 
  
    },
    error => {
      this._toastrService.info(error.json().err.message, 'Pedido');     
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
  cargarTotal(){
    this.total=0;
    for(let item of this.platosPedido){
    this.total=this.total+item.precio;
    }
  }

  guardarPedido(){   
     
      this.guardando=true;
  
      this.pedido.mesa=this.mesa._id;
      this.pedido.precio=this.total;
      this.pedido.restaurant=this.restaurant._id;
      this.pedido.estado=true;
      let platos:string[]=[];
  
      for(let item of this.platosPedido){
        platos.push(item._id);
      }
  
     this.pedido.plato=platos;
      
     this._pedidoService.put(this.pedido)
     .subscribe(data => {    
      setTimeout(() => {
       // this.pedidoGuardado=true;
       // this.platosPedido=[];
        //this.total=0;
        //this.buscarPlatosDelPedido();
        this.guardando=false;
        this._toastrService.success('Pedido Guardado', 'Pedido');  
              
      }, 1000);
  
     },
     error => {
      setTimeout(() => {
       // this.AgregarPedido.emit(false);
        this.guardando=false;
        this._toastrService.info(error.json().err.message, 'tipos platos');     
  
      }, 1000);
     });    
  }

  obtenerTotal(item){
    this.total=item;
  }

}
