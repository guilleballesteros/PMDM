import { Component, OnInit } from '@angular/core';
import { TaskI } from '../../models/task.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  fechaIni: Date;
  fechaFin: Date;
  public todos: TaskI [] = [];
  constructor(private todoService: TodoService) {}
  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
    this.todos = res;
  });
  }

}
