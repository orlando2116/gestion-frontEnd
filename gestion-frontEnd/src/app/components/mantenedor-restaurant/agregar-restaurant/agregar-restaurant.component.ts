import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

//models
import { Restaurant } from '../../../models/restaurant';

//services
import { RestaurantService } from '../../../services/restaurant.service';


@Component({
  selector: 'app-agregar-restaurant',
  templateUrl: './agregar-restaurant.component.html',
  styleUrls: ['./agregar-restaurant.component.css']
})
export class AgregarRestaurantComponent implements OnInit {
  
  private guardando: boolean=false;

  @Output() AgregarRestaurant: EventEmitter<any> = new EventEmitter<any>();
  
  private restaurant:Restaurant=new Restaurant();

  constructor(private modalService: NgbModal,
              private _restaurantService:RestaurantService,
              private _toastrService: ToastrService) { }

  ngOnInit() {
  }

  openVerticallyCentered(content) {
    const modalRef=this.modalService.open(content, { centered: true });

    modalRef.result.then((data) => {
     this.reinicarDatos();
    }, (reason) => {
      this.reinicarDatos();
    });
  }

  guardarRestaurant(){ 
    this.guardando=true;

    this._restaurantService.post(this.restaurant)
    .subscribe(res=>{
      setTimeout(() => {
        this._toastrService.success('Restaurant Agregado.', 'Restaurant');
        this.guardando=false;
        this.AgregarRestaurant.emit(true);
        this.reinicarDatos();
      }, 2000);      
    },err=>{     
      setTimeout(() => {
        this._toastrService.error(err.json().err.message, 'Restaurant');
        this.guardando=false;
        this.AgregarRestaurant.emit(false);
      }, 2000);    
    });    
  }
  
  validarGuardar(){
    if(this.restaurant.nombre!==undefined && this.restaurant.nombre!=='' &&
      this.restaurant.direccion!==undefined && this.restaurant.direccion!==''){
      return true;
    }
    return false;
  }

  reinicarDatos(){
    this.restaurant=new Restaurant();
  }
}
