import { ElementSchemaRegistry, NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonBackButtonDelegate } from '@ionic/angular';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  eventSource = [];
  J=false;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate = new Date();

  constructor(private db: AngularFirestore,) {
    this.db.collection(`Parte de asistencia`).snapshotChanges().subscribe(colSnap => {
      this.eventSource = [];
      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        this.eventSource.push(event);
      });
    });
  }

  ngOnInit(){

  }
 
  addFaltaJust() {
    let start = this.selectedDate;
    let end = this.selectedDate;
    end.setMinutes(end.getMinutes() + 60);

    let event = {
      title: 'FALTA JUSTIFICADA #' + start.getMinutes(),
      startTime: start,
      endTime: end,
      addFaltaJust: true,
      eventColor:'red'
    };
    this.db.collection(`Parte de asistencia`).add(event);
  };
  addFaltaInjust() {
    let start = this.selectedDate;
    let end = this.selectedDate;
    end.setMinutes(end.getMinutes() + 60);
    
    let event = {
      title: 'FALTA INJUSTIFICADA #' + start.getMinutes(),
      startTime: start,
      endTime: end,
      J: false,
      eventColor:'yellow'
  };

    this.db.collection(`Parte de asistencia`).add(event);
  }

  onViewTitleChanged(title) {
    console.log(title);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
   
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

}
