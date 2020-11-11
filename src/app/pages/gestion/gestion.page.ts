import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {

  componentes: Componente[] = [
    {
    imagen: "/assets/img/List.png",
    name: 'listado de fichas',
    redirectTo: '../listado'
    },
    {
    imagen: "/assets/img/Add.png",
    name: 'Creacion de fichas',
    redirectTo: '../creacion'
    },
    {
      imagen: "../assets/img/Calendar.png",
      name: 'Avatar',
      redirectTo: '../asistencia'
    },
    ];

  constructor() { }

  ngOnInit() {
  }
}
interface Componente {
  imagen: string;
  name: string;
  redirectTo: string;
}
