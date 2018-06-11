import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';

//models
import { Plato } from '../../../../../models/plato';

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {
  
  @Input() platosPedido: Plato[];  
  @Input() total:number;
  
  //obtenemos total
  @Output() ObtenerTotal: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  
  eliminarPlato(index:number){
    this.platosPedido.splice(index, 1);
    this.cargarTotal();
  }
 
  cargarTotal(){
    this.total=0;

    for(let item of this.platosPedido){
      this.total=this.total+item.precio;
    }

    this.ObtenerTotal.emit(this.total);
  }
  


}
