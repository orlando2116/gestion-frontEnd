import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

//models
import { Restaurant } from '../../../models/restaurant';

//services
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-editar-restaurant',
  templateUrl: './editar-restaurant.component.html',
  styleUrls: ['./editar-restaurant.component.css']
})
export class EditarRestaurantComponent implements OnInit {
  
  @Input() restaurant: Restaurant;
  @Output() EditarRestaurant: EventEmitter<any> = new EventEmitter<any>();

  private nombre:string='';
  private direccion:string='';
  private estado:boolean=false;
  private _id:string='';

  private editando: boolean=false;

  constructor(private modalService: NgbModal,
              private _toastrService: ToastrService,
              private _restaurantService:RestaurantService) { }

  ngOnInit() {

    this.nombre=this.restaurant.nombre;
    this.direccion=this.restaurant.direccion;
    this.estado=this.restaurant.estado;
    this._id=this.restaurant._id;

  }


  openVerticallyCentered(content) {
    const modalRef=this.modalService.open(content, { centered: true });

    modalRef.result.then((data) => {
    
    }, (reason) => {
     
    });
  }

  guardarCamios(){
    if (this._id===''){
      this._toastrService.info('Restaurant ya editado', 'Restaurant');
      return false;
    }
    this.editando=true;
  
    const restaurantEditar={
      _id:this._id,
      nombre:this.nombre,
      direccion:this.direccion,
      estado:this.estado};

    this._restaurantService.put(restaurantEditar)
    .subscribe(res=>{
      setTimeout(() => {
        this._toastrService.success('Restaurant Editado.', 'Restaurant');
        this.editando=false;
        this.reinicarDatos();
        this.EditarRestaurant.emit(true);
       
      }, 2000);      
    },err=>{     
      setTimeout(() => {
        this._toastrService.error(err.json().err.message, 'Restaurant');
        this.editando=false;
        this.EditarRestaurant.emit(false);
       
      }, 2000);    
    });  
  }

  validarEditar(){
    if(this.nombre!==undefined && this.nombre!=='' &&
      this.direccion!==undefined && this.direccion!==''){
      return true;
    }
    return false;
  }
  reinicarDatos(){
    this.restaurant=new Restaurant();
    this.nombre='';
    this.direccion='';
    this.estado=false;
    this._id='';
  }

}
