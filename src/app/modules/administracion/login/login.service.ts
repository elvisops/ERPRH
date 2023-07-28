import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';

// import { HttpRequest } from './httprequest.interface';
import { HttprequestInterface } from './httprequest.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = environment.api
  DataSend:HttprequestInterface = {proc:"", payload:""}
  constructor(
    private http:HttpClient,
    private auth: AuthService,
    private snack:MatSnackBar
  ) { }

  login(usuario:string,password:string):Observable<any>{
    var payload = this.auth.mkpayload({proc:"SP_VALIDAR_REGISTROS", usuario:usuario,cod:usuario, password:password})
    // var payload = this.auth.mkpayload({proc:"validarUsuario", usuario:usuario})

    return this.http.post<any>(`${this.api}/apiERP/proc`,{proc:"login",payload:payload})
    // /apiERP/proc
    .pipe(
      tap(),
      catchError(this.handleError("Error al iniciar la sesion"))
    )
  }

  getPermisos(){
    var token = 'token'
    var payload = this.auth.mkpayload({proc: 'SP_USER_PERMISOS', token:token})
    // console.log(payload)

    return this.http.post<any>(`${this.api}/apiERP/get`,{proc:"get_permisos",payload:payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al obtener los modulos"))
    )
  }

  leerPermisos():any{
    if (sessionStorage.getItem('permisos')!=undefined) {
      var permisos:any = sessionStorage.getItem('permisos')
      permisos = this.auth.desencriptar(permisos)
      permisos = JSON.parse(permisos)
      return permisos
    }
  }

  notificacion(msg:string):void{
    this.snack.open(msg, "Cerrar",{
      horizontalPosition:"center",
      verticalPosition:'top',
      duration: 5000
    })
  }

  setSessionStorage():any{
    // if (sessionStorage.getItem('permisos') != undefined) {
    //   var permisos:any = sessionStorage.getItem('permisos')
    //   permisos = this.auth.desencriptar(permisos)
    //   permisos = JSON.parse(permisos)
    //   return permisos
    // }
    sessionStorage.setItem('logged','true')
  }

  getDashboard():Observable<any>{
    var token = 'token'
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc: "SP_DASHBOARD_LISTA", token:token})
    return this.http.post(`${this.api}/apiERP/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener el dashboard"))
      )
  }

  getDashboard2():Observable<any>{
    var token = 'token'
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc: "SP_DASHBOARD_LISTA2", token:token})
    return this.http.post(`${this.api}/apiERP/get`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError("Error al obtener el segundo dashboard"))
    )
  }

  private handleError<T>(operation = 'operacion', result?:T){
    return(error:any):Observable<T>=>{
      console.log('Error en la aplicacion: '+JSON.stringify(error));
      console.log(error)
      return of(result as T)      
    }
  }
}
