import { Component, Inject, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';

//models
import {TipoPlato} from '../../../../models/tipoPlato';
import {Restaurant} from '../../../../models/restaurant';

//services
import {TipoPlatoService} from '../../../../services/tipo-plato.service';

@Component({
  selector: 'app-agregar-tipo-plato',
  templateUrl: './agregar-tipo-plato.component.html',
  styleUrls: ['./agregar-tipo-plato.component.css']
})
export class AgregarTipoPlatoComponent implements OnInit {

  @Output() AgregarTipoPlato: EventEmitter<any> = new EventEmitter<any>();

  private restaurant:Restaurant=new Restaurant();

  private tipoPlato:TipoPlato=new TipoPlato();
  private guardando:boolean=false;

  constructor(private modalService: NgbModal,
              private _toastrService: ToastrService,
              private _tipoPlatoService:TipoPlatoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = JSON.parse(params['parameter']);
      this.tipoPlato.restaurant=this.restaurant._id;
     }); 
  }

  openVerticallyCentered(content) {
    const modalRef=this.modalService.open(content, { centered: true });

    modalRef.result.then((data) => {
    }, (reason) => {
    });
  }

  guardarTipoPlato(){
    this.guardando=true;
    
    this._tipoPlatoService.post(this.tipoPlato)
    .subscribe(res=>{
      setTimeout(() => {
        this._toastrService.success('Tipo Plato Agregado', 'platos');
        this.guardando=false;
        this.AgregarTipoPlato.emit(true);
        this.reinicarDatos();
      }, 1000);      
    },err=>{     
      setTimeout(() => {
        this._toastrService.error(err.json().err.message, 'platos');
        this.guardando=false;
        this.AgregarTipoPlato.emit(false);
      }, 1000);    
    });  
  }
  validarAgregar(){
    if(this.tipoPlato.nombre!==undefined){
      return true;
    }
    return false;
  }


  reinicarDatos(){
    this.tipoPlato=new TipoPlato();
    this.tipoPlato.restaurant=this.restaurant._id;
  }

}
