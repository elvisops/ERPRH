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
import { HttpClient } from '@angular/common/http';


//formatear fecha
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-colaboradores-permanentes-editar',
  templateUrl: './colaboradores-permanentes-editar.component.html',
  styleUrls: ['./colaboradores-permanentes-editar.component.css']
})
export class ColaboradoresPermanentesEditarComponent implements OnInit {

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

  // idTipo: number = 0;
  listaTipo: any[] = [
    { ID: '1', TIPO: 'OPS CONTACT CENTER' },
    { ID: '2', TIPO: 'OUTSOURCING PARTNER SOLUTIONS' },
  ];

  // idSexo: number = 0;
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
  observacion: string = this.data.Observaciones;
  imagen: string = this.data.Imagen;
  idTipo: number = this.data.tipo;
  idSexo: number = this.data.sexo

  // vista de la imagen
  imageURL!: string;

  // public archivos: any = [];
  public previsualizacion: string = '';

  selectedFile: File | null = this.data.Imagen;

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

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  constructor(
    private dialogRef: MatDialogRef<ColaboradoresPermanentesEditarComponent>,
    private service: ColaboradoresPermanentesService,
    private auth: AuthService,
    private exportAsService: ExportAsService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  listaColaboradorespermantentes: ColaboradoresPermanentes[] = [];
  DataSource: MatTableDataSource<ColaboradoresPermanentes> = new MatTableDataSource();
  Columnas: string[] = ['Historico', 'Accion', 'Identidad', 'Nombre', 'tipo', 'EstadoCivil', 'Estatus', 'cod_empleado', 'FechaModificacion', 'Locker', 'Area',
    'Cartera', 'Proyecto', 'supervisor', 'IdMarcacion', 'Marcador', 'FechaIngreso', 'InicioContrato', 'FinContrato', 'FechaNac']


  ngOnInit(): void {
    // console.log(this.imagen)
    // borrar
    // Ejemplo de la cadena que contiene la ruta de la imagen
    // const rutaImagen = 'images/Personal/0801-1997-01692.jpg';
    const rutaImagen = this.imagen;

    // Expresión regular para extraer el nombre del archivo
    const expresionRegular = /images\/Personal\/(.+)$/;

    // Aplicar la expresión regular a la cadena
    const coincidencia = rutaImagen.match(expresionRegular);

    // Verificar si hay una coincidencia y obtener el nombre del archivo
    if (coincidencia && coincidencia.length > 1) {
      const nombreArchivo = coincidencia[1];
      this.imagen = nombreArchivo
      console.log(nombreArchivo);
    } 
    // else {
    //   console.log('No se encontró un nombre de archivo válido en la cadena.');
    // }
    //

    this.previsualizacion = "http://10.8.8.115:3001/image/" + this.imagen + "";
    // console.log(this.identidad)
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


  ValidarInpust() {
    if (!this.identidad) {
      this.identidadInvalida = true;
    }
    if (!this.nombreInvalida) {
      this.nombreInvalida = true;
    }
    
    if (!this.idPuestoInvalida) {
      this.idPuestoInvalida = true;
    }

    if (!this.profesionInvalida) {
      this.profesionInvalida = true;
    }

    if (!this.estadoCivilInvalida) {
      this.estadoCivilInvalida = true;
    }

    if (!this.idMarcacionInvalida) {
      this.idMarcacionInvalida = true;
    }

    if (!this.fechaNacimientoInvalida) {
      this.fechaNacimientoInvalida = true;
    }

    if (!this.marcadorInvalida) {
      this.marcadorInvalida = true;
    }

    if (!this.telefonosInvalida) {
      this.telefonosInvalida = true;
    }

    if (!this.lockerInvalida) {
      this.lockerInvalida = true;
    }

    if (!this.codEmpleadoInvalida) {
      this.codEmpleadoInvalida = true;
    }

    if (!this.fechaIngresoInvalida) {
      this.fechaIngresoInvalida = true;
    }

    if (!this.domicilioInvalida) {
      this.domicilioInvalida = true;
    }

    if (!this.idAreaInvalida) {
      this.idAreaInvalida = true;
    }

    if (!this.idCarteraInvalida) {
      this.idCarteraInvalida = true;
    }

    if (!this.idProyectoInvalida) {
      this.idProyectoInvalida = true;
    }

    if (!this.idSupervisorInvalida) {
      this.idSupervisorInvalida = true;
    }

    if (!this.inicioPermanenciaInvalida) {
      this.inicioPermanenciaInvalida = true;
    }

    if (!this.inicioPermanenciaInvalida) {
      this.inicioPermanenciaInvalida = true;
    }

    if (!this.finContratoInvalida) {
      this.finContratoInvalida = true;
    }

    if (!this.idPermisoContratoInvalida) {
      this.idPermisoContratoInvalida = true;
    }

    if (!this.idPermisoRedOPSInvalida) {
      this.idPermisoRedOPSInvalida = true;
    }

    if (!this.salarioInvalida) {
      this.salarioInvalida = true;
    }

    if (!this.idTipoInvalida) {
      this.idTipoInvalida = true;
    }

    if (!this.comisionInvalida) {
      this.comisionInvalida = true;
    }

    if (!this.idSexoInvalida) {
      this.idSexoInvalida = true;
    }

    if (!this.hijosInvalida) {
      this.hijosInvalida = true;
    }
    if (
      this.identidad === '' ||
      this.nombre === '' ||
      this.idPuesto <= 0 ||
      this.profesion === '' ||
      this.estadoCivil === '' ||
      this.idMarcacion === '' ||
      this.fechaNacimiento === '' ||
      this.marcador === '' ||
      this.telefonos === '' ||
      this.locker === '' ||
      // this.correo === '' ||
      this.codEmpleado <= 0 ||
      this.fechaIngreso === '' ||
      this.domicilio === '' ||
      this.idArea <= 0 ||
      this.idCartera <= 0 ||
      this.idProyecto <= 0 ||
      this.idSupervisor <= 0 ||
      !this.inicioPermanencia ||
      !this.finContrato ||
      this.idPermisoContrato <= 0 ||
      this.idPermisoRedOPS <= 0 ||
      this.salario <= 0 ||
      this.idTipo <= 0 ||
      this.comision < 0 ||
      this.idSexo <= 0 ||
      this.hijos < 0
    ) {
      this.service.notificacion('Debe llenar los campos del formularia');
      return;
    }

    if(this.selectedFile == null){
      this.service.notificacion('Debe seleccionar una imagen para el empleado');
      return;
    }


    // this.CrearColaborador();
    this.guardarColaborador();
  }

  guardarColaborador() {
    // formatear las fechas
    // this.fechaIng = this.datePipe.transform(this.fechaIngreso, 'yyyy-MM-dd') ?? '';
    // this.fechaF = this.datePipe.transform(this.fechaFin, 'yyyy-MM-dd') ?? '';
    // this.fechaNacimiento,this.fechaIngreso
    this.fechaNacimiento =
      this.datePipe.transform(this.fechaNacimiento, 'yyyy-MM-dd') ?? '';
    this.fechaIngreso =
      this.datePipe.transform(this.fechaIngreso, 'yyyy-MM-dd') ?? '';
    this.inicioPermanencia =
      this.datePipe.transform(this.inicioPermanencia, 'yyyy-MM-dd') ?? '';
    this.finContrato =
      this.datePipe.transform(this.finContrato, 'yyyy-MM-dd') ?? '';

    if (this.selectedFile == null || this.selectedFile == undefined) {
      this.generarNombreImagen();
      // console.log("genera NOmbre Imagen")
    }
    // console.log(this.imagen)
    if (this.imageURL == "" || this.imageURL == null || this.imageURL == undefined) {
      this.imageURL = this.imagen
    }
    // const urlImg = './imagenes/contratos/personal';

    // this.service.notificacion('Guardar empleado');
    this.puesto;
    this.service
      .EditarColaborador(
        this.identidad,
        this.nombre,
        this.idPuesto,
        this.profesion,
        this.estadoCivil,
        this.idMarcacion,
        this.fechaNacimiento,
        this.marcador,
        this.telefonos,
        this.locker,
        this.correo,
        this.codEmpleado,
        this.fechaIngreso,
        this.domicilio,
        this.idArea,
        this.idCartera,
        this.idProyecto,
        this.idSupervisor,
        this.inicioPermanencia,
        this.finContrato,
        this.idPermisoContrato,
        this.idPermisoRedOPS,
        this.salario,
        this.idTipo,
        this.comision,
        this.idSexo,
        this.hijos,
        this.observacion,
        this.imageURL
      )
      .subscribe((r) => {
        var respuesta = this.auth.desencriptar(r.response);

        respuesta = JSON.parse(respuesta);
        // console.log(respuesta.message)

        if (respuesta[0].status === 1) {
          this.service.notificacion(respuesta[0].message);
          console.log(this.selectedFile)
          if (this.selectedFile !== null || this.selectedFile !== undefined) {
            this.uploadImage();
          }
          
          // this.LimpiarInputs();
          // this.genCodEmpleado();
        } else {
          this.service.notificacion(respuesta[0].message);
        }
      });

    // // si se guarda el empleado guardar la imagen
    // this.uploadImage()
  }

  generarNombreImagen() {
    // if (this.selectedFile == null) {
    //   this.selectedFile = this.imagen
    // }
    if (this.selectedFile) {
      const fileNameParts = this.selectedFile.name.split('.');
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLocaleLowerCase();
      this.imageURL = this.identidad + '.' + fileExtension; // Cambio de nombre de la imagen
      // alert(this.imageURL)
    }
  }

  uploadImage() {
    
    if (this.selectedFile) {
      const formData = new FormData();
      // const fileNameParts = this.selectedFile.name.split('.');
      // const fileExtension =
      //   fileNameParts[fileNameParts.length - 1].toLocaleLowerCase();
      // const newFileName = this.identidad + '.' + fileExtension; // Cambio de nombre de la imagen
      formData.append('image', this.selectedFile, this.imageURL);

      this.http.post<any>('http://10.8.8.115:3001/upload', formData).subscribe(
        (response) => {
          console.log('Imagen subida con éxito');
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }

  LimpiarInputs(){
    this.identidad = ""
    this.nombre = ""
    this.idPuesto = 0
    this.profesion = ""
    this.estadoCivil = ""
    this.idMarcacion = ""
    this.fechaNacimiento = ""
    this.marcador = ""
    this.telefonos = ""
    this.locker = ""
    this.correo = ""
    this.codEmpleado = 0
    this.fechaIngreso = ""
    this.domicilio = ""
    this.idArea = 0
    this.idCartera = 0
    this.idProyecto = 0
    this.idSupervisor = 0
    this.inicioPermanencia = ""
    this.finContrato = ""
    this.idPermisoContrato = 0
    this.idPermisoRedOPS = 0
    this.salario = 0
    this.idTipo = 0
    this.comision = 0
    this.idSexo = 0
    this.hijos = 0
    this.observacion = ""
    this.imageURL = ""
    this.selectedFile = null
    this.previsualizacion = ""
    this.identidadInvalida = false
    this.nombreInvalida = false
    this.idPuestoInvalida = false
    this.profesionInvalida = false
    this.estadoCivilInvalida = false
    this.idMarcacionInvalida = false
    this.fechaNacimientoInvalida = false
    this.marcadorInvalida = false
    this.telefonosInvalida = false
    this.lockerInvalida = false
    this.codEmpleadoInvalida = false
    this.fechaIngresoInvalida = false
    this.domicilioInvalida = false
    this.idAreaInvalida = false
    this.idCarteraInvalida = false
    this.idProyectoInvalida = false
    this.idSupervisorInvalida = false
    this.inicioPermanenciaInvalida = false
    this.finContratoInvalida = false
    this.idPermisoContratoInvalida = false
    this.idPermisoRedOPSInvalida = false
    this.salarioInvalida = false
    this.idTipoInvalida = false
    this.comisionInvalida = false
    this.idSexoInvalida = false
    this.hijosInvalida = false
  }

  CloseDialog() {
    this.dialogRef.close()
  }

  Filtrar(evt: Event) {
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage()
    }
  }
}
