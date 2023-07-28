import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { PruebaComponent } from './prueba/prueba.component';
import { ColaboradoresPermanentesComponent } from './colaboradores-permanentes/colaboradores-permanentes.component';
import { ColaboradoresInactivosComponent } from './colaboradores-permanentes/colaboradores-inactivos/colaboradores-inactivos.component';

const routes: Routes = [
    {path: '', component: AdministracionComponent},
    {path: 'mantenimientoempleados', component: ColaboradoresPermanentesComponent},
    {path:'prueba', component: PruebaComponent},
    {path: 'mantenimientoempleados/inactivos', component: ColaboradoresInactivosComponent}
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
