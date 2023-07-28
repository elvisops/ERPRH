import { Component, Inject, OnInit, ViewChild } from '@angular/core';

// exportacion 
import {
  ExportAsService,
  ExportAsConfig,
  SupportedExtensions,
} from 'ngx-export-as';
import { ColaboradoresPermanentesService } from '../colaboradores-permanentes.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ColaboradoresPermanentes } from '../colaboradores-permanentes';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-colaboradores-permanentes-editar',
  templateUrl: './colaboradores-permanentes-editar.component.html',
  styleUrls: ['./colaboradores-permanentes-editar.component.css']
})
export class ColaboradoresPermanentesEditarComponent implements OnInit{

  estadoCivil: number | string = this.data.EstadoCivil;
  ListaEstadoCivil: any[] = [
    { ID: '1', ESTADO: 'Soltero' },
    { ID: '2', ESTADO: 'Casado' },
    { ID: '3', ESTADO: 'Union Libre' },
    { ID: '4', ESTADO: 'Divorsiado' },
  ];

  idPuesto: number = this.data.Puesto;
  listaPuestos: any[] = [];

  marcador: string = this.data.Marcador;
  listaMarcadores: any[] = [
    { ID: '1', MARCADOR: '3er Piso' },
    { ID: '2', MARCADOR: '4to Piso' },
    { ID: '3', MARCADOR: '5to Piso' },
    { ID: '4', MARCADOR: '6to Piso' },
  ];

  idArea: number = this.data.idArea;
  listaAreas: any[] = [];

  idCartera: number = this.data.idCartera;
  listaCarteras: any[] = [];

  idProyecto: number = this.data.idProyecto;
  listaProyectos: any[] = [];

  idSupervisor: number = this.data.idSupervisor;
  listaSupervisores: any[] = [];

  idPermisoContrato: number = this.data.id_permiso_contratos;
  listaPermisosContratos: any[] = [];

  idPermisoRedOPS: number = this.data.idPermiso;
  listaPermisosRedOPS: any[] = [];

  idTipo: number = 0;
  listaTipo: any[] = [
    { ID: '1', TIPO: 'OPS CONTACT CENTER' },
    { ID: '2', TIPO: 'OUTSOURCING PARTNER SOLUTIONS' },
  ];

  idSexo: number = 0;
  listaSexo: any[] = [
    { ID: '1', SEXO: 'Femenino' },
    { ID: '2', SEXO: 'Masculino' },
  ];

  // variables inpust
  identidad: string = this.data.Identidad;
  nombre: string = this.data.Nombre;
  puesto: string = this.data.Puesto;
  profesion: string = this.data.Profesion;
  idMarcacion: string = this.data.IdMarcacion;
  fechaNacimiento: string = this.data.FechaNac;
  telefonos: string = this.data.Telefonos;
  locker: string = this.data.Locker;
  correo: string = this.data.correo;
  codEmpleado: number = this.data.cod_empleado;
  fechaIngreso: string = this.data.FechaIngreso;
  domicilio: string = this.data.Domicilio;
  inicioPermanencia: string = this.data.InicioContrato;
  finContrato: string = this.data.FinContrato;
  salario: number = this.data.salario;
  comision: number = this.data.comision;
  hijos: number = this.data.hijos;
  observacion: string = this.data.Observacion;

  // vista de la imagen
  imageURL!: string;

  // public archivos: any = [];
  public previsualizacion: string = '';

  selectedFile: File | null = null;

  searchTermPuesto!: string;
  searchTermArea!: string;
  searchTermProyecto!: string;
  searchTermCartera!: string;
  searchTermSupervisor!: string;

  // identidadControl = new FormControl('', Validators.required);
  mostrarError = false;

  // identidad!: string;
  // errorIdentidad: boolean = false;
  // errorNombre: boolean = false;
  // formularioEnviado: boolean = false;
  // filteredAreas!: any[];

  identidadInvalida: boolean = false;
  nombreInvalida: boolean = false;
  idPuestoInvalida: boolean = false;
  profesionInvalida: boolean = false;
  estadoCivilInvalida: boolean = false;
  idMarcacionInvalida: boolean = false;
  fechaNacimientoInvalida: boolean = false;
  marcadorInvalida: boolean = false;
  telefonosInvalida: boolean = false;
  lockerInvalida: boolean = false;
  codEmpleadoInvalida: boolean = false;
  fechaIngresoInvalida: boolean = false;
  domicilioInvalida: boolean = false;
  idAreaInvalida: boolean = false;
  idCarteraInvalida: boolean = false;
  idProyectoInvalida: boolean = false;
  idSupervisorInvalida: boolean = false;
  inicioPermanenciaInvalida: boolean = false;
  finContratoInvalida: boolean = false;
  idPermisoContratoInvalida: boolean = false;
  idPermisoRedOPSInvalida: boolean = false;
  salarioInvalida: boolean = false;
  idTipoInvalida: boolean = false;
  comisionInvalida: boolean = false;
  idSexoInvalida: boolean = false;
  hijosInvalida: boolean = false;

  @ViewChild(MatPaginator) paginator! : MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  constructor(
    private dialogRef: MatDialogRef<ColaboradoresPermanentesEditarComponent>,
    private service: ColaboradoresPermanentesService,
    private auth: AuthService,
    private exportAsService: ExportAsService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  listaColaboradorespermantentes : ColaboradoresPermanentes[] = [];
  DataSource: MatTableDataSource<ColaboradoresPermanentes> = new MatTableDataSource();
  Columnas: string[] = ['Historico','Accion','Identidad','Nombre','tipo','EstadoCivil','Estatus','cod_empleado','FechaModificacion','Locker','Area', 
  'Cartera','Proyecto','supervisor','IdMarcacion','Marcador','FechaIngreso','InicioContrato','FinContrato','FechaNac']
  

  ngOnInit(): void {
    this.genListaPuestos()
    this.genListaPuestos()
    this.genAreas()
    this.onAreaChange()
    this.onCarteraChange()
    this.genListaSupervisores()
    this.genListaPermisosRedOPS()
    this.genListaPermisosContratos()
  }

  genCodEmpleado() {
    this.service.getCodEmpleado().subscribe((r) => {
      var data = this.auth.desencriptar(r.data);
      data = JSON.parse(data);
      this.codEmpleado = data[0].cod_empleado;
      console.log(this.codEmpleado);
    });
  }

  genListaPuestos() {
    this.service.getListaPuestos().subscribe((r) => {
      var data = this.auth.desencriptar(r.data);
      this.listaPuestos = JSON.parse(data);
      console.log(this.listaPuestos);
      // this.listaPuestos, this.idPuesto
    });
  }

  genAreas() {
    this.service.getListaAreas().subscribe((r) => {
      var data = this.auth.desencriptar(r.data);
      // console.log(JSON.parse(data))
      this.listaAreas = JSON.parse(data);
    });
  }

  onAreaChange() {
    // this.areaSeleccionada = this.
    // alert(this.idArea)
    this.service.getListaCarteras(this.idArea).subscribe((r) => {
      var data = this.auth.desencriptar(r.data);
      this.listaCarteras = JSON.parse(data);
      // console.log(this.listaCarteras)
    });
  }

  onCarteraChange() {
    // alert( this.idCartera)
    this.service
      .getListaProyectos(this.idArea, this.idCartera)
      .subscribe((r) => {
        var data = this.auth.desencriptar(r.data);
        this.listaProyectos = JSON.parse(data);
        console.log(this.listaProyectos);
      });
  }

  onProyectoChange() {
    // alert(this.idProyecto)
  }

  genListaSupervisores() {
    this.service.getListaSupervisores().subscribe((r) => {
      var data = this.auth.desencriptar(r.data);
      // console.log(JSON.parse(data))
      // this.listaAreas = JSON.parse(data)
      this.listaSupervisores = JSON.parse(data);
      console.log(this.listaSupervisores);
    });
  }

  genListaPermisosContratos() {
    this.service.getListaPermisosContratos().subscribe((r) => {
      var data = this.auth.desencriptar(r.data);
      this.listaPermisosContratos = JSON.parse(data);
      console.log(this.listaPermisosContratos);
    });
  }

  genListaPermisosRedOPS() {
    this.service.getListaPermisosRedOPS().subscribe((r) => {
      var data = this.auth.desencriptar(r.data);
      this.listaPermisosRedOPS = JSON.parse(data);
      console.log(this.listaPermisosRedOPS);
    });
  }



  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewSelectedImage();
  }

  previewSelectedImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previsualizacion = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);

      //nombre de la imagen
      // const formData = new FormData();
    }
  }

  
  applyFilter(data: any[], searchTerm: string, property: string): any[] {
    if (searchTerm) {
      return data.filter((item) =>
        item[property].toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return data;
    }
  }

  CloseDialog(){
    this.dialogRef.close()
  }

  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage()
    }
  }
}
