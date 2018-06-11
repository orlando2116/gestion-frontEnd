import { Component, Inject, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//models
import { Restaurant } from '../../models/restaurant';
import {TipoPlato} from '../../models/tipoPlato';

@Component({
  selector: 'app-gestion-restaurant',
  templateUrl: './gestion-restaurant.component.html',
  styleUrls: ['./gestion-restaurant.component.css']
})
export class GestionRestaurantComponent implements OnInit {
  
  
  @Output() ObtenerTipoPlato: EventEmitter<any> = new EventEmitter<any>();

  private tipoPlato:TipoPlato=new TipoPlato();

  private restaurant:Restaurant=new Restaurant();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = JSON.parse(params['parameter']);
    });  
  }

  obtenerTipoPlato(tipoPlato:TipoPlato){
    this.tipoPlato=tipoPlato;
  }


}
