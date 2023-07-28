import { Component, Inject, OnInit, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColaboradoresPermanentesService } from '../colaboradores-permanentes.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
//formatear fecha
import { DatePipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-colaboradores-permanentes-crear',
  templateUrl: './colaboradores-permanentes-crear.component.html',
  styleUrls: ['./colaboradores-permanentes-crear.component.css'],
})
export class ColaboradoresPermanentesCrearComponent implements OnInit {
  // exampleHeader = ColaboradoresPermanentesCrearComponent

  estadoCivil: number | string = 0;
  ListaEstadoCivil: any[] = [
    { ID: '1', ESTADO: 'Soltero' },
    { ID: '2', ESTADO: 'Casado' },
    { ID: '3', ESTADO: 'Union Libre' },
    { ID: '4', ESTADO: 'Divorsiado' },
  ];

  idPuesto: number = 0;
  listaPuestos: any[] = [];

  marcador: string = '';
  listaMarcadores: any[] = [
    { ID: '1', MARCADOR: '3er Piso' },
    { ID: '2', MARCADOR: '4to Piso' },
    { ID: '3', MARCADOR: '5to Piso' },
    { ID: '4', MARCADOR: '6to Piso' },
  ];

  idArea: number = 0;
  listaAreas: any[] = [];

  idCartera: number = 0;
  listaCarteras: any[] = [];

  idProyecto: number = 0;
  listaProyectos: any[] = [];

  idSupervisor: number = 0;
  listaSupervisores: any[] = [];

  idPermisoContrato: number = 0;
  listaPermisosContratos: any[] = [];

  idPermisoRedOPS: number = 0;
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
  identidad: string = '';
  nombre: string = '';
  puesto: string = '';
  profesion: string = '';
  idMarcacion: string = '';
  fechaNacimiento: string = '';
  telefonos: string = '';
  locker: string = '';
  correo: string = '';
  codEmpleado: number = 0;
  fechaIngreso: string = '';
  domicilio: string = '';
  inicioPermanencia: string = '';
  finContrato: string = '';
  salario: number = 0;
  comision: number = 0;
  hijos: number = 0;
  observacion: string = '';

  // vista de la imagen
  imageURL!: string;

  // public archivos: any = [];
  public previsualizacion: string = '';

  selectedFile: File | null = null;

  //filtro input
  // searchTerm!: string;

  searchTermPuesto!: string;
  searchTermArea!: string;
  searchTermProyecto!: string;
  searchTermCartera!: string;
  searchTermSupervisor!: string;

  identidadControl = new FormControl('', Validators.required);
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

  @ViewChild('fileInput', { static: false }) fileInput: any;
  constructor(
    private dialogRef: MatDialogRef<ColaboradoresPermanentesCrearComponent>,
    private service: ColaboradoresPermanentesService,
    private auth: AuthService,
    //imagen
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.genCodEmpleado();
    this.genListaPuestos();
    this.genAreas();
    this.genListaSupervisores();
    this.genListaPermisosContratos();
    this.genListaPermisosRedOPS();
  }
  onSubmit() {
    if (this.identidadControl.invalid) {
      // El campo de entrada es inválido, no se realiza el envío
      this.service.notificacion('Debe ingresar la identidad');
      return;
    }

    // Resto de la lógica para enviar el formulario
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

    this.CrearColaborador();
  }

  CrearColaborador() {
    // this.errorIdentidad = this.identidad.trim() === '' && this.formularioEnviado;
    // this.validarCampos();

    // this.errorIdentidad = this.identidad.trim() === '';
    // this.errorNombre = this.nombre.trim() === '';
    // this.mostrarError = true;
    // if (this.identidadControl.invalid) {
    //   // El campo de entrada es inválido, no se realiza el envío
    //   this.service.notificacion("Debe ingresar la identidad")
    //   this.mostrarError = true;
    //   return;
    // }

    // if (
    //   this.selectedFile !== null &&
    //   this.selectedFile.type &&
    //   !this.selectedFile.type.startsWith('image/')
    // ) {
    //   this.service.notificacion(
    //     'El archivo seleccionado no es una imagen válida.'
    //   );
    //   return;
    // }

    // if (this.identidad === '') {
    //   this.service.notificacion('Debe ingresar la identidad del colaborador');
    //   return;
    // }

    // if(this.selectedFile === null){
    //   this.service.notificacion('Debe seleccionar una foto')
    //   return
    // }
    // alert(this.identidad+', '+this.nombre+', '+this.puesto+', '+this.profesion+', '+this.estadoCivil+', '+this.idMarcacion+', '+
    // this.fechaNacimiento+', '+this.marcador+', '+this.telefonos+', '+this.locker+', '+this.correo+', '+this.codEmpleado+', '+this.fechaIngreso+', '+
    // this.domicilio+', '+this.idArea+', '+this.idCartera+', '+this.idProyecto+', '+this.idSupervisor+', '+
    // this.inicioPermanencia+', '+this.finContrato+', '+this.idPermisoContrato+', '+this.idPermisoRedOPS+', '+
    // this.salario+', '+this.idTipo+', '+this.comision+', '+this.idSexo+', '+this.hijos+', '+this.observacion)

    // if (
    //   this.identidad === '' ||
    //   this.nombre === '' ||
    //   this.idPuesto <=0 ||
    //   this.profesion === '' ||
    //   this.estadoCivil === '' ||
    //   this.idMarcacion === '' ||
    //   this.fechaNacimiento === '' ||
    //   this.marcador === '' ||
    //   this.telefonos === '' ||
    //   this.locker === '' ||
    //   // this.correo === '' ||
    //   this.codEmpleado <= 0 ||
    //   this.fechaIngreso === '' ||
    //   this.domicilio === '' ||
    //   this.idArea <= 0 ||
    //   this.idCartera <= 0 ||
    //   this.idProyecto <= 0 ||
    //   this.idSupervisor <= 0 ||
    //   !this.inicioPermanencia ||
    //   !this.finContrato ||
    //   this.idPermisoContrato <= 0 ||
    //   this.idPermisoRedOPS <= 0 ||
    //   this.salario <= 0 ||
    //   this.idTipo <= 0 ||
    //   this.comision < 0 ||
    //   this.idSexo <= 0 ||
    //   this.hijos < 0
    // ) {
    //   this.service.notificacion('Debe llenar los campos del formularia');
    //   return;
    // }

    this.validarExistenciaEmpleado();
  }

  validarExistenciaEmpleado() {
    this.service.ValidarIdentidad(this.identidad).subscribe((r) => {
      var respuesta = this.auth.desencriptar(r.response);
      respuesta = JSON.parse(respuesta);
      respuesta = respuesta[0];
      console.log(respuesta);

      if (respuesta.status == 1) {
        //llamar al proc para insertar
        this.guardarColaborador();
      } else {
        this.service.notificacion(respuesta.message);
      }
      // console.log(respuesta[0].message)
    });
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

    this.generarNombreImagen();
    // const urlImg = './imagenes/contratos/personal';

    // this.service.notificacion('Guardar empleado');
    this.puesto;
    this.service
      .AgregarColaborador(
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
          this.uploadImage();
          this.LimpiarInputs();
          this.genCodEmpleado();
        } else {
          this.service.notificacion(respuesta[0].message);
        }
      });

    // // si se guarda el empleado guardar la imagen
    // this.uploadImage()
  }

  // http://10.8.8.115:3001/image/IMG_0059.JPG -> link para ver la imagen
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

  generarNombreImagen() {
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

  applyFilter(data: any[], searchTerm: string, property: string): any[] {
    if (searchTerm) {
      return data.filter((item) =>
        item[property].toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return data;
    }
  }

  CloseDialog() {
    this.dialogRef.close();
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
}


// <mat-form-field appearance="outline" class="w-100 my-2">
//           <mat-label>Marcador</mat-label>
//           <mat-select [(ngModel)]="marcador">
//             <mat-option></mat-option>
//             <mat-option
//               *ngFor="let marcador of listaMarcadores"
//               [value]="marcador.MARCADOR"
//               required
//             >
//               {{ marcador.MARCADOR }}
//             </mat-option>
//           </mat-select>
//           <div>
//             <mat-error *ngIf="marcadorInvalida && !marcador"
//               >El campo es obligatorio*</mat-error
//             >
//           </div>
//         </mat-form-field>