import { Component, Inject, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

//services
import { RestaurantService } from '../../services/restaurant.service';

//models
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-mantenedor-restaurant',
  templateUrl: './mantenedor-restaurant.component.html',
  styleUrls: ['./mantenedor-restaurant.component.css']
})
export class MantenedorRestaurantComponent implements OnInit {
  
  private restaurants:Restaurant[]=[];
  
  @Output() AgregarRestaurant: EventEmitter<any> = new EventEmitter<any>();
  @Output() EditarRestaurant: EventEmitter<any> = new EventEmitter<any>();
  
  private mostrarInactivos:boolean=false;
  constructor(private _restaurantService:RestaurantService,
              private _toastrService: ToastrService,
              private _spinnerService: Ng4LoadingSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.buscarRestaurantes(true);
  }

  buscarRestaurantes(estado:boolean){
    this._restaurantService.get(estado)
      .subscribe(data => {       
        this.restaurants=data.message.json().restaurant;       
      },
      error => {
        this._toastrService.info(error.json().err.message, 'Restaurants');     
      });
  }

  agregarRestaurant(item) {
   if(item){
    this.buscarRestaurantes(true);
   }
  }  

  editarRestaurant(item){
   if(item){
    if(!this.mostrarInactivos){
      this.buscarRestaurantes(true);
    }else{
      this.buscarRestaurantes(false);
    }
   }
  }

  mostrarRestaurantFiltro(){
    this._spinnerService.show();
    setTimeout(() => {
      if(this.mostrarInactivos){
        this.buscarRestaurantes(false);
      }else{
        this.buscarRestaurantes(true);
      }
      this._spinnerService.hide();
    }, 2000);   
  }

  redirigir(restaurant:Restaurant){
    this.router.navigate(['/gestionRestaurant', JSON.stringify(restaurant)]);
  }
}
