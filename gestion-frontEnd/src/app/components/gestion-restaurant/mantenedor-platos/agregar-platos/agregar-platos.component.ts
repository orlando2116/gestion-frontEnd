import { Component, Inject, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

//models
import { TipoPlato } from '../../../../models/tipoPlato';
import { Plato } from '../../../../models/plato';

//services
import { PlatoService } from '../../../../services/plato.service';

@Component({
  selector: 'app-agregar-platos',
  templateUrl: './agregar-platos.component.html',
  styleUrls: ['./agregar-platos.component.css']
})
export class AgregarPlatosComponent implements OnInit {
  
  @Input() tipoPlato: TipoPlato;
  @Output() AgregarPlato: EventEmitter<any> = new EventEmitter<any>();

  private guardando:boolean=false;

  private plato:Plato=new Plato();

  constructor(private modalService: NgbModal,
              private _toastrService: ToastrService,
              private _platoService:PlatoService) { }

  ngOnInit() {

  }

  ngOnChanges(){
    this.plato.tipoPlato=this.tipoPlato._id;
  }


  openVerticallyCentered(content) {
    const modalRef=this.modalService.open(content, { centered: true });

    modalRef.result.then((data) => {
    }, (reason) => {
    });
  }


  guardarPlato(){
    this.guardando=true;
    this._platoService.post(this.plato)
    .subscribe(res=>{
      setTimeout(() => {
        this._toastrService.success('Plato Agregado', 'Platos');
        this.guardando=false;
        this.AgregarPlato.emit(true);
        this.reinicarDatos();
      }, 1000);      
    },err=>{     
      setTimeout(() => {
        this._toastrService.error(err.json().err.message, 'Platos');
        this.guardando=false;
        this.AgregarPlato.emit(false);
      }, 1000);    
    });   
  }

  validarAgregar(){
    if(this.plato.nombre!==undefined && this.plato.nombre!=='' &&
      this.plato.precio!==undefined && this.plato.precio!==0){
      return true;
    }
    return false;
  }

  reinicarDatos(){
    this.plato=new Plato();
    this.plato.tipoPlato=this.tipoPlato._id;
  }
}
