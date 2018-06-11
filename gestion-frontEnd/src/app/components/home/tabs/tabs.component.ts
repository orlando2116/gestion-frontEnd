import { Component, OnInit,Inject } from '@angular/core';

//autorizador
import { Autorizador } from '../../../dependencies/autorizador';
import { Iautorizador } from '../../../interfaces/iautorizador';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  constructor(@Inject('IAutorizador') private autorizador: Iautorizador) { }

  ngOnInit() {
  }

}
