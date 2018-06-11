import { Component, Inject, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//models
import {Plato} from '../../../models/plato';
import {TipoPlato} from '../../../models/tipoPlato';
import {Restaurant} from '../../../models/restaurant';

//services
import {PlatoService} from '../../../services/plato.service';
import { TipoPlatoService } from '../../../services/tipo-plato.service';

@Component({
  selector: 'app-mantenedor-platos',
  templateUrl: './mantenedor-platos.component.html',
  styleUrls: ['./mantenedor-platos.component.css']
})
export class MantenedorPlatosComponent implements OnInit {

  private platos:Plato[]=[];
  private restaurant:Restaurant=new Restaurant();

  @Input() tipoPlato: TipoPlato;
  @Output() AgregarPlato: EventEmitter<any> = new EventEmitter<any>();
  @Output() EditarPlato: EventEmitter<any> = new EventEmitter<any>();

  private terminos:string='';
  constructor(private route: ActivatedRoute,
              private _tipoPlatoService:TipoPlatoService,
              private _platoService:PlatoService) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = JSON.parse(params['parameter']);
     });  
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
    this._platoService.getTerminos(this.tipoPlato._id,this.terminos)
    .subscribe(res=>{

        this.platos=res.message.json().plato;  
  
    },err=>{     
 
    });  
  }

  agregarPlato(item) {
    if(item){
      this.terminos='';
      this.buscarPlatos();
    }  
  }  

  buscarTermino(){
    if(this.terminos===''){
      this.buscarPlatos();
    }else{
      this.buscarPlatosPorTermino();
    }
  }

  editarPlato(item){
     if(item){
       this.buscarPlatos();
     }    
   }

}
