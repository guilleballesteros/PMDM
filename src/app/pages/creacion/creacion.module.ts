import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreacionPageRoutingModule } from './creacion-routing.module';

import { CreacionPage } from './creacion.page';
import { ComponentsModule } from '../../components/components.module';
import { TaskI } from '../../models/task.interface';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreacionPage]
})
export class CreacionPageModule {}
