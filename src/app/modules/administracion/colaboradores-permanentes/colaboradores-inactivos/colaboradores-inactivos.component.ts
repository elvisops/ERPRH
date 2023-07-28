import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ColaboradoresPermanentesService } from '../colaboradores-permanentes.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ColaboradoresInactivos } from './colaboradores-inactivos';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  ExportAsService,
  ExportAsConfig,
  SupportedExtensions,
} from 'ngx-export-as';

import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { HistoricoColaboradoresInactivosComponent } from './historico-colaboradores-inactivos/historico-colaboradores-inactivos.component';
import { ActivarColaboradorComponent } from './activar-colaborador/activar-colaborador.component';
@Component({
  selector: 'app-colaboradores-inactivos',
  templateUrl: './colaboradores-inactivos.component.html',
  styleUrls: ['./colaboradores-inactivos.component.css'],
})
export class ColaboradoresInactivosComponent implements OnInit {
  // years: any[] = [
  //   {TEXTO:'2019', VALOR:'2019'},
  //   {TEXTO:'2020', VALOR:'2020'},
  //   {TEXTO:'2021', VALOR:'2021'},
  //   {TEXTO:'2022', VALOR:'2022'},
  //   {TEXTO:'2023', VALOR:'2023'},
  // ]; // Opciones de años

  // Obtener el año actual
  years: any[] = [];

  months: any[] = [
    { TEXTO: 'Ver todos', VALOR: 'Todos' },
    { TEXTO: 'Enero', VALOR: '01' },
    { TEXTO: 'Febrero', VALOR: '02' },
    { TEXTO: 'Marzo', VALOR: '03' },
    { TEXTO: 'Abril', VALOR: '04' },
    { TEXTO: 'Mayo', VALOR: '05' },
    { TEXTO: 'Junio', VALOR: '06' },
    { TEXTO: 'Julio', VALOR: '07' },
    { TEXTO: 'Agosto', VALOR: '08' },
    { TEXTO: 'Septiembre', VALOR: '09' },
    { TEXTO: 'Octubre', VALOR: '10' },
    { TEXTO: 'Noviembre', VALOR: '11' },
    { TEXTO: 'Diciembre', VALOR: '12' },
  ]; // Opciones de meses
  filtros: any[] = [
    { TEXTO: 'Ver Todos', VALOR: 'Todos' },
    { TEXTO: 'Finalizacion de Contrato', VALOR: 'renuncia' },
    { TEXTO: 'Renuncia', VALOR: 'RRHH' },
    { TEXTO: 'Abandono', VALOR: 'abandono' },

    // 'Finalizacion de Contrato','Renuncia','Abandono'
  ];

  selectedYear: string = '';
  selectedMonth: string = '';
  selectedFiltro: string = '';

  year: any;
  month: any;
  filtro: any;

  tabla: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ColaboradoresPermanentesService,
    private auth: AuthService, // @Inject(MAT_DIALOG_DATA) public data:any
    private exportAsService: ExportAsService,
    private dialog: MatDialog,
    )
  {}

  listaColaboradoresInactivos: ColaboradoresInactivos[] = [];
  DataSource: MatTableDataSource<ColaboradoresInactivos> =
    new MatTableDataSource();
  Columnas: string[] = [
    'Accion','Historicos','Observacion',
    'Estatus',
    'Motivo',
    'recontratacion',
    'porque',
    'FechaBaja',
    'Identidad',
    'Nombre',
    'EstatusContrato',
    'tipo_compania',
    'Area',
    'Cartera',
    'Proyecto',
    'FechaIngreso',
    'InicioContrato',
    'FinContrato',
    'FechaTransaccion',
    'Telefonos',
    'Domicilio',
  ];
  // Columnas: string[] =[
  // 'EstadoCivil','FechaCreacion','Contrasenia',
  // 'FechaModificacion','FechaNac',
  // 'Fecha_ult_ingreso','IdMarcacion',
  // 'Imagen','Locker','Marcador',
  // 'Observaciones','Permiso','Profesion',
  // 'Puesto','cod_empleado','comision','correo','hijos',
  // 'id','idArea','idCartera','idPermiso','idProyecto','idSupervisor',
  // 'id_permiso_contratos','salario','sexo',
  // 'tema','tipo'
  //]

  ngOnInit(): void {
    this.fillYears();
  }

  fillYears(): void {
    const currentYear = new Date().getFullYear();
    this.years = [{ TEXTO: 'Ver de Todos los años', VALOR: 'Todos' }];
    for (let i = 0; i < 5; i++) {
      const year = currentYear - i;
      this.years.push({ TEXTO: year.toString(), VALOR: year.toString() });
    }
  }
  MostrarDatos() {
    if (
      this.selectedYear === '' ||
      this.selectedMonth === '' ||
      this.selectedFiltro == ''
    ) {
      this.auth.notificacion('Por favor selecciones los filtros');
      return;
    }

    this.GenerarDatos();
    // alert(
    //   this.selectedYear + ' ' + this.selectedMonth + ' ' + this.selectedFiltro
    // );
    // return;
    // this.service
    //   .Mostrar(this.selectedYear, this.selectedMonth, this.selectedFiltro)
    //   .subscribe((r) => {
    //     var respuesta = this.auth.desencriptar(r.data);
    //     console.log(JSON.parse(respuesta));
    //   });
  }

  GenerarDatos() {
    if (this.selectedFiltro == 'RRHH') {
      this.filtro = '="5"';
    } else if (this.selectedFiltro == 'renuncia') {
      this.filtro = 'not in ("5","7")';
    } else if (this.selectedFiltro == 'abandono') {
      this.filtro = '="7"';
    } else {
      this.filtro = 'LIKE "%"';
    }

    // alert(this.filtro)

    if (this.selectedYear == 'Todos') {
      this.year = 'LIKE "%"';
    } else {
      this.year = '="' + this.selectedYear + '"';
    }

    // alert(this.year)

    if (this.selectedMonth == 'Todos') {
      this.month = 'LIKE "%"';
    } else {
      this.month = '="' + this.selectedMonth + '"';
    }

    // alert(this.month)

    this.service.Mostrar(this.year, this.month, this.filtro).subscribe((r) => {
      var respuesta = this.auth.desencriptar(r.data);
      console.log(JSON.parse(respuesta));
      this.listaColaboradoresInactivos = JSON.parse(respuesta);

      this.PrepararDatos();
    });
  }

  PrepararDatos() {
    // Realizar la validación del campo estatus y asignar la leyenda correspondiente
    this.listaColaboradoresInactivos.forEach((registro) => {
      var estatus = '';
      if (registro.Estatus === 'D') {
        estatus = 'Renuncia';
      } else if (registro.Estatus === 'NR') {
        estatus = 'Finalización de Contrato';
      } else if (registro.Estatus === 'AB') {
        estatus = 'Abandono';
      }
      registro.Estatus = estatus;
    });

    this.listaColaboradoresInactivos.forEach((registro) => {
      // const fechaBaja = new Date(registro.FechaBaja);
      // const dia = fechaBaja.getDate().toString().padStart(2, '0');
      // const mes = (fechaBaja.getMonth() + 1).toString().padStart(2, '0');
      // const anio = fechaBaja.getFullYear().toString();

      // const fechaFormateada = `${dia}/${mes}/${anio}`;
      // var fechaBaja = ""
      
      
      
      // var fechaBaja = this.FormatearFecha(registro.FechaBaja);
      // registro.FechaBaja = fechaBaja;
      // // registro.FechaBaja = fechaFormateada;

      // var fechaIngreso = this.FormatearFecha(registro.FechaIngreso);
      // registro.FechaIngreso = fechaIngreso

      // var inicioContrato = this.FormatearFecha(registro.InicioContrato);
      // registro.InicioContrato = inicioContrato

      // var finContrato = this.FormatearFecha(registro.FinContrato);
      // registro.FinContrato = finContrato
      // var fechaTransaccion = this.FormatearFecha(registro.FechaTransaccion);
      // registro.FechaTransaccion = fechaTransaccion
    });

    this.FillTable(this.listaColaboradoresInactivos);
  }

  FormatearFecha(fecha: string):string {
    // const fechaBaja = new Date(fecha);
    // const opcionesFormato: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // const fechaFormateada = fechaBaja.toLocaleDateString('es-ES', opcionesFormato);
    // return fechaFormateada;
    // registro.FechaBaja = fechaFormateada;
    // const fechaObjeto = parseISO(fecha);
    // const fechaFormateada = format(fechaObjeto, 'yyyy-MM-dd');
    // return fechaFormateada;
    const fechaObjeto = parseISO(fecha);
    const fechaFormateada = format(utcToZonedTime(fechaObjeto, 'America/Tegucigalpa'), 'yyyy/MM/dd');
    return fechaFormateada;
  }

  FillTable(Datos: ColaboradoresInactivos[]) {
    this.DataSource = new MatTableDataSource(Datos);
    this.DataSource.sort = this.sort;
    this.DataSource.paginator = this.paginator;
    this.tabla = true
  }

  exportTableAs(format: SupportedExtensions) {
    const exportConfig: ExportAsConfig = {
      type: format,
      elementIdOrContent: 'tablaInactivos',
    };
    this.exportAsService.save(exportConfig, 'Datos').subscribe(() => {});
  }

  OpenDialogActivar(element: any){
    const dialogRef = this.dialog.open(ActivarColaboradorComponent,{
      width: '80%',
      data: element,
      disableClose: true
    })
  }

  OpenDialogHistorico(element: any){
    const dialogRef = this.dialog.open(HistoricoColaboradoresInactivosComponent,{
      width:'80%',
      data: element,
      disableClose: true
    })
  }
  Filtrar(evt: Event) {
    const valorFiltrado = (evt.target as HTMLInputElement).value;
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
    }
  }
}
