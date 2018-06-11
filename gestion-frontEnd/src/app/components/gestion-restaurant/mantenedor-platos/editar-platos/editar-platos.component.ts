import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

//services
import { PlatoService } from '../../../../services/plato.service';

//models
import { Plato } from '../../../../models/plato';

@Component({
  selector: 'app-editar-platos',
  templateUrl: './editar-platos.component.html',
  styleUrls: ['./editar-platos.component.css']
})
export class EditarPlatosComponent implements OnInit {
  
  @Input() plato: Plato;
  @Output() EditarPlato: EventEmitter<any> = new EventEmitter<any>();

  private editando:boolean=false;

  private nombre:string='';
  private descripcion:string='';
  private precio:number=0;
  private estado:boolean=false;
  private _id:string='';

  
  constructor(private modalService: NgbModal,
              private _toastrService: ToastrService,
              private _platoService:PlatoService) { }

  ngOnInit() {
    this.nombre=this.plato.nombre;
    this.descripcion=this.plato.descripcion;
    this.precio=this.plato.precio;
    this.estado=this.plato.estado;
    this._id=this.plato._id;
  }

  ngOnChanges(){
  }
  openVerticallyCentered(content) {
    const modalRef=this.modalService.open(content, { centered: true });

    modalRef.result.then((data) => {
    
    }, (reason) => {
     
    });
  }

  guardarCamios(){
   
    if (this._id===''){
      this._toastrService.info('Plato ya editado', 'Plato');
      return false;
    }

    this.editando=true;
  
    const platoEditar={
      _id:this._id,
      nombre:this.nombre,
      descripcion:this.descripcion,
      precio:this.precio,
      estado:this.estado};

    this._platoService.put(platoEditar)
    .subscribe(res=>{
      setTimeout(() => {
        this._toastrService.success('Plato Editado.', 'Plato');
        this.editando=false;
        this.reinicarDatos();
        this.EditarPlato.emit(true);
       
      }, 2000);      
    },err=>{     
      setTimeout(() => {
        this._toastrService.error(err.json().err.message, 'Plato');
        this.editando=false;
        this.EditarPlato.emit(false);
       
      }, 2000);    
    });  
  }

  reinicarDatos(){
    this.plato=new Plato();
    this.nombre='';
    this.descripcion='';
    this.precio=0;
    this.estado=false;
    this._id='';
  }

  validarEditar(){
    if(this.nombre!==undefined && this.nombre!=='' &&
      this.precio!==undefined && this.precio!==0){
      return true;
    }
    return false;
  }
}
