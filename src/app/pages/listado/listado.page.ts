import { Component, OnInit } from '@angular/core';
import { TaskI } from '../../models/task.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  todos: TaskI[];
  constructor(private todoService: TodoService) {}
  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
    this.todos = res;
  });
  }

}
