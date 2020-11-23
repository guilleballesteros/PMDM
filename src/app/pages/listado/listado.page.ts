import { Component, OnInit } from '@angular/core';
import { TaskI } from '../../models/task.interface';
import { TodoService } from '../../services/todo.service';
import { isWithinInterval, isBefore } from 'date-fns';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  fechaMax: string = new Date().toISOString();
  fechaIni: string = this.fechaMax;
  fechaFin: string = this.fechaMax;
  public todos: TaskI [] = [];
  filtered: TaskI [] = [];
  constructor(private todoService: TodoService) {}
  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
    this.todos = res;
    this.filtered = this.todos;
  });
  }
  loadResults(){
    if ( !this.fechaIni ){
      this.fechaIni = this.fechaFin;
    }
    else if (!this.fechaFin || this.fechaFin < this.fechaIni){
      this.fechaFin = this.fechaIni;
    }
    const fechaIni = new Date(this.fechaIni);
    const fechaFin = new Date(this.fechaFin);
    this.filtered = this.todos.filter(item => {
      return isWithinInterval(new Date(item.fecha), { start: fechaIni, end: fechaFin});
    });

  }

}
