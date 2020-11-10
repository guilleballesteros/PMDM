import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {

  componentes: Componente[] = [
    {
    icon : 'american-football',
    name: 'listado de fichas',
    redirectTo: 'listado'
    },
    {
    icon : 'football-outline',
    name: 'Alert',
    redirectTo: 'creacion de fichas'
    },
    {
      icon : 'beaker',
      name: 'Avatar',
      redirectTo: 'asistencia'
    },
    ];

  constructor() { }

  ngOnInit() {
  }

}
