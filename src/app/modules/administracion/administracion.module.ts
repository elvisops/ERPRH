import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { PruebaComponent } from './prueba/prueba.component';
import { LoginComponent } from './login/login.component';

import { MaterialsModule } from '../public/materials/materials.module';
import { ColaboradoresPermanentesComponent } from './colaboradores-permanentes/colaboradores-permanentes.component';

//exportacion
import { ExportAsModule } from 'ngx-export-as';
import { ColaboradoresPermanentesCrearComponent } from './colaboradores-permanentes/colaboradores-permanentes-crear/colaboradores-permanentes-crear.component';


// calendario
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { ColaboradoresInactivosComponent } from './colaboradores-permanentes/colaboradores-inactivos/colaboradores-inactivos.component';
import { HistoricoColaboradoresInactivosComponent } from './colaboradores-permanentes/colaboradores-inactivos/historico-colaboradores-inactivos/historico-colaboradores-inactivos.component';
import { ActivarColaboradorComponent } from './colaboradores-permanentes/colaboradores-inactivos/activar-colaborador/activar-colaborador.component';
import { ConfirmationDialogComponentComponent } from './colaboradores-permanentes/colaboradores-inactivos/activar-colaborador/confirmation-dialog-component/confirmation-dialog-component.component';
import { DatePipe } from '@angular/common';
import { ColaboradoresPermanentesEditarComponent } from './colaboradores-permanentes/colaboradores-permanentes-editar/colaboradores-permanentes-editar.component';

@NgModule({
  declarations: [
    AdministracionComponent,
    PruebaComponent,
    LoginComponent,
    ColaboradoresPermanentesComponent,
    ColaboradoresPermanentesCrearComponent,
    ColaboradoresInactivosComponent,
    HistoricoColaboradoresInactivosComponent,
    ActivarColaboradorComponent,
    ConfirmationDialogComponentComponent,
    ColaboradoresPermanentesEditarComponent,
    // DatePipe,
    
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    MaterialsModule,
    ExportAsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  providers: [DatePipe],
  schemas:[

  ]
})
export class AdministracionModule { }
