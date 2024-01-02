import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, tap} from 'rxjs/operators'
import { Observable, of} from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresPermanentesService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  api = environment.api
  getEmpleadosPermanentes():Observable<any>{
    var payload = this.auth.mkpayload({proc: 'SP_EMPLEADOS_PERMA_LISTA'})
    return this.http.post(`${this.api}/apiERP/get`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError("Error al obtener la lista de empleados permanentes"))
    )
  }

  getCodEmpleado():Observable<any>{
    var payload = this.auth.mkpayload({proc: "SP_COD_EMPLEADO"})
    return this.http.post(`${this.api}/apiERP/get`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al obtener la lista de puestos de trabajo"))
    )
  }


  getListaPuestos():Observable<any>{
    var payload = this.auth.mkpayload({proc: "SP_PUESTOS_LISTA"})
    return this.http.post(`${this.api}/apiERP/get`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al obtener la lista de puestos de trabajo"))
    )
  }

  getListaAreas():Observable<any>{
    var payload = this.auth.mkpayload({proc: "SP_AREAS_LISTA"})
    return this.http.post(`${this.api}/apiERP/get`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de areas"))
    )
  }

  getListaCarteras(idArea: number):Observable<any>{
    var payload = this.auth.mkpayload({proc: "SP_CARTERAS_LISTA",idArea: idArea})
    return this.http.post(`${this.api}/apiERP/get`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de carteras"))
    )
  }

  getListaProyectos(idArea:number,idCartera:number):Observable<any>{
    var payload = this.auth.mkpayload({proc: "SP_PROYECTOS_LISTA",idArea:idArea,idCartera: idCartera})
    return this.http.post(`${this.api}/apiERP/get`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de proyectos"))
    )
  }

  getListaSupervisores():Observable<any>{
    var payload = this.auth.mkpayload({proc: "SP_SUPERVISORES_LISTA"})
    return this.http.post(`${this.api}/apiERP/get`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de proyectos"))
    )
  }

  getListaPermisosContratos():Observable<any>{
    var payload = this.auth.mkpayload({proc: "SP_PERMISOS_CONTRATOS_LISTA"})
    return this.http.post(`${this.api}/apiERP/get`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de permisos"))
    )
  }

  getListaPermisosRedOPS():Observable<any>{
    var payload = this.auth.mkpayload({proc: "SP_PERMISOS_REDOPS_LISTA"})
    return this.http.post(`${this.api}/apiERP/get`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de permisos Red OPS"))
    )
  }

  ValidarIdentidad(identidad:string):Observable<any>{
    var payload = this.auth.mkpayload({proc: "SP_VALIDAR_IDENTIDAD",identidad:identidad})
    return this.http.post(`${this.api}/apiERP/proc`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la validar la identidad"))
    )
  }

  // -- Identidad, Nombre, Locker,cod_empleado, IdMarcacion, Marcador, Profesion, FechaNac, Domicilio, Telefonos,FechaIngreso, EstadoCivil, idArea, idCartera, 
  // -- idProyecto, InicioContrato, FinContrato, Observaciones,Imagen,Puesto, idSupervisor, idPermiso, id_permiso_contratos, correo, tipo, salario,comision, sexo, 
  // -- hijos

  AgregarColaborador(identidad: string,nombre: string,puesto: number,profesion: string,estadoCivil: any,idMarcacion: string,
    fechaNacimiento: string,marcador: string,telefonos: string,locker: string,correo: string,codEmpleado: number,fechaIngreso: string,
    domicilio: string,idArea: number,idCartera: number,idProyecto: number,idSupervisor: number,
    inicioPermanencia: string,finContrato: string,idPermisoContrato: number,idPermisoRedOPS: number,
    salario: number,idTipo: number,comision: number,idSexo: number,hijos: number,observacion: string, urlImg: string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc: "SP_AGREGAR_EMPLEADO",
      identidad: identidad,nombre: nombre,locker: locker,codEmpleado: codEmpleado,idMarcacion: idMarcacion,marcador: marcador,
      profesion: profesion,fechaNacimiento: fechaNacimiento,domicilio: domicilio,telefonos: telefonos,
      fechaIngreso: fechaIngreso,estadoCivil:estadoCivil,idArea: idArea,idCartera: idCartera,idProyecto: idProyecto,
      inicioPermanencia: inicioPermanencia,finContrato: finContrato,observacion:observacion,urlImg: urlImg,puesto: puesto,
      idSupervisor: idSupervisor,idPermisoRedOPS: idPermisoRedOPS,idPermisoContrato: idPermisoContrato,correo: correo,
      idTipo: idTipo,salario: salario,comision: comision,idSexo: idSexo,hijos: hijos
    })
    return this.http.post(`${this.api}/apiERP/proc`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al agregar el colaborador"))
    )
  }

  EditarColaborador(identidad: string,nombre: string,puesto: number,profesion: string,estadoCivil: any,idMarcacion: string,
    fechaNacimiento: string,marcador: string,telefonos: string,locker: string,correo: string,codEmpleado: number,fechaIngreso: string,
    domicilio: string,idArea: number,idCartera: number,idProyecto: number,idSupervisor: number,
    inicioPermanencia: string,finContrato: string,idPermisoContrato: number,idPermisoRedOPS: number,
    salario: number,idTipo: number,comision: number,idSexo: number,hijos: number,observacion: string, urlImg: string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc: "SP_MODIFICAR_EMPLEADO",
      identidad: identidad,nombre: nombre,locker: locker,codEmpleado: codEmpleado,idMarcacion: idMarcacion,marcador: marcador,
      profesion: profesion,fechaNacimiento: fechaNacimiento,domicilio: domicilio,telefonos: telefonos,
      fechaIngreso: fechaIngreso,estadoCivil:estadoCivil,idArea: idArea,idCartera: idCartera,idProyecto: idProyecto,
      inicioPermanencia: inicioPermanencia,finContrato: finContrato,observacion:observacion,urlImg: urlImg,puesto: puesto,
      idSupervisor: idSupervisor,idPermisoRedOPS: idPermisoRedOPS,idPermisoContrato: idPermisoContrato,correo: correo,
      idTipo: idTipo,salario: salario,comision: comision,idSexo: idSexo,hijos: hijos
    })
    return this.http.post(`${this.api}/apiERP/proc`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al agregar el colaborador"))
    )
  }

  Mostrar(year: string, month: string, filtro: string):Observable<any>{
    // year = '2023'
    // month = '1'
    // filtro = 'filtro'
    var payload = this.auth.mkpayload({proc: 'SP_FILTRAR_INACTIVOS', year:year, month:month, filtro:filtro})
    return this.http.post<any>(`${this.api}/apiERP/get`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer el filtro"))
    )
  }

  // colaboradores inactivos
  getHistoricoInactivos(identidad:string):Observable<any>{
    var payload = this.auth.mkpayload({proc: "SP_HISTORICO_INACTIVOS",identidad:identidad})
    return this.http.post(`${this.api}/apiERP/get`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer historico de empleados inactivos"))
    )
  }

  ActivarEmpleado(identidad:string, fechaInicio:string, fechaFin:string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc: "SP_ACTIVAR_EMPLEADO",
      identidad:identidad,
      fechaInicio:fechaInicio,
      fechaFin:fechaFin
    })
    return this.http.post(`${this.api}/apiERP/proc`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al activar el usuario"))
    )
  }
  
  bitacoraEmpleado(identidad:string,nombre:string,fechaInicio:string, fechaFin:string,duracion:string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc: "SP_BITACORA_EMPLEADOS",
      identidad: identidad,
      nombre: nombre,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      duracion:duracion
    })
    return this.http.post(`${this.api}/apiERP/proc`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al registrar la bitacora"))
    )
  }

  ActualizarEstadoContratos():Observable<any>{
    var fecha = '08'
    var payload = this.auth.mkpayload({proc: "SP_ACTUALIZAR_ESTATUS_CONTRATOS", fecha: fecha})
    return this.http.post(`${this.api}/apiERP/proc`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al actualziar el estado de los contratos"))
    )
  }

  Desactivar(identidad:string,idMotivo:number,Motivo:string,fechaBaja:string,comentario:string,recontratacion:string,comentarioPorque:string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc: "SP_DESACTIVAR_EMPLEADO",
      identidad: identidad,
      idMotivo: idMotivo,
      Motivo: Motivo,
      fechaBaja: fechaBaja,
      comentario: comentario,
      recontratacion: recontratacion,
      comentarioPorque: comentarioPorque
    })
    return this.http.post(`${this.api}/apiERP/proc`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al registrar la bitacora"))
    )
  }

  notificacion(msg: string):void{
    this.snack.open(msg, "Cerrar",{
      horizontalPosition: "center",
      verticalPosition: "top",
      duration:5000
    })
  }

  private handleError<T>(operation = 'operacion', result?:T){
    return(error:any):Observable<T>=>{
      console.log('Error en la aplicacion: '+JSON.stringify(error));
      console.log(error)
      return of(result as T)      
    }
  }
}


