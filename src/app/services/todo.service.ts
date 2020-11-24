import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<TaskI>;
  private todos: Observable<TaskI[]>;
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<TaskI>('todos');
  }
  getTodos() {
    this.todos = this.db.collection('todos').snapshotChanges().pipe(map(
      actions => { // Esto lo hacemos para iterar sobre todos los documentos
      return actions.map(a => {
      const data = a.payload.doc.data() as TaskI;
      data.id = a.payload.doc.id;
      return data;
      });
      }
    ));
    return this.todos;
  }
  getTodo(id: string) {
    return this.todosCollection.doc<TaskI>(id).valueChanges();
  }
  updateTodo(todo: TaskI, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
  addTodo(todo: TaskI) {
    return this.todosCollection.add(todo);
  }
  removeTodo(id: string) {
    return this.todosCollection.doc(id).delete();
  }
}
