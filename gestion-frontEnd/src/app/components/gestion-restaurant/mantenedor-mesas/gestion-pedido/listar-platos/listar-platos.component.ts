import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';

//models
import { TipoPlato } from '../../../../../models/tipoPlato';
import { Plato } from '../../../../../models/plato';

//services
import { PlatoService } from '../../../../../services/plato.service';

@Component({
  selector: 'app-listar-platos',
  templateUrl: './listar-platos.component.html',
  styleUrls: ['./listar-platos.component.css']
})
export class ListarPlatosComponent implements OnInit {
  
  //tipo plato seleccionado
  @Input() tipoPlato: TipoPlato;
  
  //output de agregar mesas
  @Output() AgregarPlato: EventEmitter<any> = new EventEmitter<any>();


  //terminos platos
  private terminosPlato:string='';
  
  //platos
  private platos:Plato[]=[];

  constructor(private _platoService:PlatoService) { }

  ngOnInit() {
  }

  ngOnChanges(){
   this.buscarPlatos();
  }

  buscarPlatos(){
    this._platoService.get(this.tipoPlato._id)
    .subscribe(res=>{
        this.platos=res.message.json().plato;        
    },err=>{     
   
    });  
  }

  buscarPlatosPorTermino(){
    this._platoService.getTerminos(this.tipoPlato._id,this.terminosPlato)
    .subscribe(res=>{

        this.platos=res.message.json().plato;  
  
    },err=>{     
 
    }); 
  }

  agregarPlato(plato:Plato){
    this.AgregarPlato.emit(plato);
  }
}
