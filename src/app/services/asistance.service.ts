import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Assistance } from '../models/asistance.interface';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
  J = 0;
  private todosCollection: AngularFirestoreCollection<Assistance>;
  todos = [] ;
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<Assistance>('Parte de asistencia');
  }
  getTodos() {
    this.todosCollection.snapshotChanges().subscribe((colSnap => {
      this.todos = [];
      colSnap.forEach(snap => {
        const event: any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        if (this.J === 0){
          event.eventColor = 'red';
        }
        else{
          event.eventColor = 'yellow';
        }
        this.todos.push(event);
      });
    }));
  }
  addFaltaJust(dateIni: Date, dateFin: Date) {
    const start = dateIni;
    const end = dateFin;
    end.setMinutes(end.getMinutes() + 60);

    const event = {
      title: 'FALTA JUSTIFICADA',
      startTime: start,
      endTime: end,
      J: 1
    };
    return this.todosCollection.add(event);
  }
  addFaltaInjust(dateIni: Date, dateFin: Date) {
    const start = dateIni;
    const end = dateFin;
    end.setMinutes(end.getMinutes() + 60);
    const event = {
      title: 'FALTA INJUSTIFICADA',
      startTime: start,
      endTime: end,
      J: 0,
  };

    return this.todosCollection.add(event);
  }


}
