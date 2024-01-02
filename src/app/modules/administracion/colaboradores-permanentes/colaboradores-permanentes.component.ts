import { Component, OnInit, ViewChild } from '@angular/core';
import { ColaboradoresPermanentesService } from './colaboradores-permanentes.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ColaboradoresPermanentes } from './colaboradores-permanentes';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {
  ExportAsService,
  ExportAsConfig,
  SupportedExtensions,
} from 'ngx-export-as';
import { MatDialog } from '@angular/material/dialog';
import { ColaboradoresPermanentesCrearComponent } from './colaboradores-permanentes-crear/colaboradores-permanentes-crear.component';
import { HistoricoColaboradoresInactivosComponent } from './colaboradores-inactivos/historico-colaboradores-inactivos/historico-colaboradores-inactivos.component';
import { ColaboradoresPermanentesEditarComponent } from './colaboradores-permanentes-editar/colaboradores-permanentes-editar.component';
import { ColaboradoresPermanentesDesactivarComponent } from './colaboradores-permanentes-desactivar/colaboradores-permanentes-desactivar.component';



@Component({
  selector: 'app-colaboradores-permanentes',
  templateUrl: './colaboradores-permanentes.component.html',
  styleUrls: ['./colaboradores-permanentes.component.css']
})
export class ColaboradoresPermanentesComponent implements OnInit{
  @ViewChild(MatPaginator) paginator! : MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  constructor(
    private service: ColaboradoresPermanentesService,
    private auth: AuthService,
    private exportAsService: ExportAsService,
    private dialog: MatDialog,

  ){}

  listaColaboradorespermantentes : ColaboradoresPermanentes[] = [];
  DataSource: MatTableDataSource<ColaboradoresPermanentes> = new MatTableDataSource();
  Columnas: string[] = ['Historico','Accion','Identidad','Nombre','tipo','EstadoCivil','Estatus','cod_empleado','FechaModificacion','Locker','Area', 
  'Cartera','Proyecto','supervisor','IdMarcacion','Marcador','FechaIngreso','InicioContrato','FinContrato','FechaNac']
  

  ngOnInit(): void {
    this.genEmpleadosPermanentes()
  }

  genEmpleadosPermanentes(){
    this.service.getEmpleadosPermanentes().subscribe(r => {
      var data = JSON.parse(this.auth.desencriptar(r.data));
      console.log(data)
      this.listaColaboradorespermantentes = data
      this.FillTable(this.listaColaboradorespermantentes)
    })
  }

  exportTableAs(format: SupportedExtensions) {
    const exportConfig: ExportAsConfig = {
      type: format,
      elementIdOrContent: 'tabla',
    };
    this.exportAsService.save(exportConfig, 'Datos').subscribe(() => {});
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(ColaboradoresPermanentesCrearComponent,{
      width:'70%',
      data: null,
      disableClose: true
    })
  }

  UpdateEstadoContratos(){
    this.service.ActualizarEstadoContratos().subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta);
      if (respuesta[0].status == 1) {
        this.service.notificacion(respuesta[0].message)
      }else{
        this.service.notificacion(respuesta[0].message)
      }
    })
  }

  OpenDialogHistorico(element: any){
    const dialogRef = this.dialog.open(HistoricoColaboradoresInactivosComponent,{
      width:"90%",
      data: element,
      disableClose: true
    })
  }

  OpenDialogEditarColaborador(element: any){
    const dialogRef = this.dialog.open(ColaboradoresPermanentesEditarComponent,{
      width: '90%',
      data: element,
      disableClose: true
    })
  }

  OpenDialogDesactivarColaborador(element:any){
    const dialogRef = this.dialog.open(ColaboradoresPermanentesDesactivarComponent, {
      width: '90%',
      data: element,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(datos => {
      this.genEmpleadosPermanentes()
    })
  }

  FillTable(Datos: ColaboradoresPermanentes[]){
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage()
    }
  }
}
