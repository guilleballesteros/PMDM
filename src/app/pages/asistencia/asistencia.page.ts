import { ElementSchemaRegistry, NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonBackButtonDelegate } from '@ionic/angular';
import { reduce } from 'rxjs/operators';
import { AssistanceService } from '../../services/asistance.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  eventSource = [];
  J = 0;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate = new Date();

  constructor(private service: AssistanceService) {
    service.getTodos();
  }

  ngOnInit(){

  }

  addFaltaJust() {
    const start = this.selectedDate;
    const end = this.selectedDate;
    this.service.addFaltaJust(start, end);
  }
  addFaltaInjust() {
    const start = this.selectedDate;
    const end = this.selectedDate;
    this.service.addFaltaInjust(start, end);
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
