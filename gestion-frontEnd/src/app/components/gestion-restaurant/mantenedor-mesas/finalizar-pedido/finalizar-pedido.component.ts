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
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css']
})
export class FinalizarPedidoComponent implements OnInit {

   //restaurtant de URL
   private restaurant:Restaurant=new Restaurant();
  
    //mesa que se finalizara pedido
    @Input() mesa: Mesa;
  
     //pedido editando
   private pedido:Pedido=new Pedido();
  
     //lista platos pedidos
  private platosPedido:Plato[]=[];

   
   //total
   private total:number=0;

   //finalizar pedido
   @Output() FinalizarPedido: EventEmitter<any> = new EventEmitter<any>();
  
   private pedidoFinalizado:boolean=false;
  private guardando:boolean=false;
  constructor(private modalService: NgbModal,   
              private route: ActivatedRoute,
              private _toastrService: ToastrService,
              private _pedidoService:PedidoService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = JSON.parse(params['parameter']);
     });  
     //this.buscarPlatosDelPedido();
    
  }

  openVerticallyCentered(content) {
    const modalRef=this.modalService.open(content, {  size: 'lg' });
    this.platosPedido=[];
    this.buscarPlatosDelPedido();

    modalRef.result.then((data) => {
      this.pedidoFinalizado=false;
    }, (reason) => {
      this.pedidoFinalizado=false;
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

  cargarTotal(){
    this.total=0;
    for(let item of this.platosPedido){
    this.total=this.total+item.precio;
    }
  }



  finalizarPedido(){
    this.guardando=true;

    this.pedido.mesa=this.mesa._id;
    this.pedido.precio=this.total;
    this.pedido.restaurant=this.restaurant._id;
    this.pedido.estado=false;
    let platos:string[]=[];

    for(let item of this.platosPedido){
      platos.push(item._id);
    }

   this.pedido.plato=platos;
    this._pedidoService.put(this.pedido)
     .subscribe(data => {   
     
      setTimeout(() => {
        this.guardando=false;
        this.FinalizarPedido.emit(this.mesa); 
         this.pedidoFinalizado=true;
        this._toastrService.success('Pedido Guardado', 'Pedido');  
              
      }, 1000);
  
     },
     error => {
      setTimeout(() => {
        this.FinalizarPedido.emit(false);
        this.guardando=false;
        this._toastrService.info(error.json().err.message, 'tipos platos');     
  
      }, 1000);
     });
  }

  obtenerTotal(item){
    this.total=item;
  }
}
