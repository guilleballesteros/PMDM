import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // En FireBase, las colecciones son similares a las tablas en las BD Relacionales
  private todosCollection: AngularFirestoreCollection<TaskI>;
  private todos: Observable<TaskI[]>; // Donde guardaremos todas las tareas


  constructor(db: AngularFirestore) {
    this.todosCollection = db.collection<TaskI>('todos');
    // 'snapshotChange()' devuelve un Observable de datos que representan
    // el estado actual del a Colección (Tabla)
    // La función 'pipe()' permite enlazar varios operadores juntos o
    // funciones y devuelve el resultado de ejecutarlas secuencialmente
    // El Operador 'map' coge los valores que vienen de un Observable, los
    // transforma y devuelve otro Observable con los valores modificados
    this.todos = this.todosCollection.snapshotChanges().pipe(map(
      actions => { // Esto lo hacemos para iterar sobre todos los documentos
      return actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.data().id;
      return { id, ...data };
      });
      }
      ));
  }
  getTodos() {
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
