import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {

  componentes: Componente[] = [
    {
    icon : 'reader-sharp',
    name: 'listado de fichas',
    redirectTo: 'listado'
    },
    {
    icon : 'add-circle-sharp',
    name: 'Creacion de fichas',
    redirectTo: 'creacion de fichas'
    },
    {
      icon : 'calendar-sharp',
      name: 'Avatar',
      redirectTo: 'asistencia'
    },
    ];

  constructor() { }

  ngOnInit() {
  }

}
