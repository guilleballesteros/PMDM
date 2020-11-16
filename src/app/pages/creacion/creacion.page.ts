import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { TaskI } from 'src/app/models/task.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.page.html',
  styleUrls: ['./creacion.page.scss'],
})
export class CreacionPage implements OnInit {

  todo: TaskI = {
    actividad: '',
    fecha: null
  };

  todoId = null;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private loadingCtrl: LoadingController,
              private todoService: TodoService) { }

  async saveTodo() {
    const loading = await this.loadingCtrl.create({
    message: 'Saving.....'
    });
    await loading.present();
    if (this.todoId) { // Usaremos el mismo botón para actualizar y para crear
    this.todoService.updateTodo(this.todo, this.todoId).then(() => {
    this.loadingCtrl.dismiss();
    this.navCtrl.navigateForward('/');
    });
    } else {
    this.todoService.addTodo(this.todo).then(() => {
    this.loadingCtrl.dismiss();
    this.navCtrl.navigateForward('/');
    });
    }
   }

  ngOnInit() {
  }

}
