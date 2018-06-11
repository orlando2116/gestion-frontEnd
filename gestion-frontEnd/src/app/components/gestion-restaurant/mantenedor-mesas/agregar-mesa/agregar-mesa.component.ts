import { Component, Inject, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

//services
import { MesaService } from '../../../../services/mesa.service';

//models
import { Restaurant } from '../../../../models/restaurant';
import { Mesa } from '../../../../models/mesa';

@Component({
  selector: 'app-agregar-mesa',
  templateUrl: './agregar-mesa.component.html',
  styleUrls: ['./agregar-mesa.component.css']
})
export class AgregarMesaComponent implements OnInit {

  @Output() AgregarMesa: EventEmitter<any> = new EventEmitter<any>();
  
  private restaurant:Restaurant=new Restaurant();

  private mesa:Mesa=new Mesa();
  private guardando:boolean=false;

  constructor(private modalService: NgbModal,
              private _toastrService: ToastrService,
              private _mesaService:MesaService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = JSON.parse(params['parameter']);
      this.mesa.restaurant=this.restaurant._id;
     });  
  }

  openVerticallyCentered(content) {
    const modalRef=this.modalService.open(content, { centered: true });

    modalRef.result.then((data) => {
    }, (reason) => {
    });
  }

  guardarMesa(){
   this.guardando=true;
   
    this._mesaService.post(this.mesa)
    .subscribe(res=>{
      setTimeout(() => {
        this._toastrService.success('Mesa Agregada', 'Mesas');
        this.guardando=false;
        this.AgregarMesa.emit(true);
        this.reinicarDatos();
      }, 1000);      
    },err=>{     
      setTimeout(() => {
        this._toastrService.error(err.json().err.message, 'Mesas');
        this.guardando=false;
        this.AgregarMesa.emit(false);
      }, 1000);    
    });   
  }

  reinicarDatos(){
    this.mesa=new Mesa();
    this.mesa.restaurant=this.restaurant._id;
  }

  validarAgregar(){
    if(this.mesa.nombre!==undefined && this.mesa.nombre!==''){
      return true;
    }
    return false;
  }
}
