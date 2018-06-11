import { Component, OnInit, Inject } from '@angular/core';

//autorizador
import { Autorizador } from '../../dependencies/autorizador';
import { Iautorizador } from '../../interfaces/iautorizador';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(@Inject('IAutorizador') private autorizador: Iautorizador) { 
  }

  ngOnInit() {
  }

}
