import { ElementSchemaRegistry, NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ECANCELED } from 'constants';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date(),

  };
  selectedDate = new Date();

  constructor(private db: AngularFirestore) {

    this.db.collection('events').snapshotChanges().subscribe(colSnap => {
      this.eventSource = [];
      colSnap.forEach(snap=>{
        let event: any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.starTime.toDate();
        event.endTime = event.endTime.toDate();
        this.eventSource.push(event);
      });
    });
  }

  ngOnInit() {
  }

  addNewEvent(){
    let start= this.selectedDate;
    let end = this.selectedDate;
    end.setMinutes(end.getMinutes()+60);
    let event={
      title: 'Event # - ' + start.getMinutes(),
      startTime: start,
      endTime : end,
      allDay:false
    }
    this.db.collection('events').add(event);
  }

  onViewTitleChanged(title){
    console.log(title)
  }
  onEventSelected(event){
    console.log('Event selected: '+ event.starTime + '-'+ event.endTime + '-' + event.title)
  }
  onTimeSelected(ev){
    console.log('Selected time: ' +ev.selectedTime + ', hasEvents: '+
    (ev.events !== undefined && ev.events.length !== 0) +', disabled: '+ ev.disabled)
    this.selectedDate=ev.selectedTime;
    console.log(this.selectedDate)
  }
  onCurrentDateChanged(event: Date){
    console.log('Current date change: ' + event)
  }
  onRangeChanged(ev){
    console.log('Range changed: starTime: ' + ev.starTime + ', endTime: ' + ev.endTime)
  }

}
