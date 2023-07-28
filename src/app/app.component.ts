import { Component, OnInit } from '@angular/core';

import { LoginService } from './modules/administracion/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ERPRH';
  isLogged:boolean = false;
  username: string = ""
  permisos:any = []
  modulos:any = []

  constructor(private LoginService: LoginService){}


  ngOnInit(): void {
    this.ValidarSesion()
    this.getModulos()
  }

  ValidarSesion(){
    this.isLogged = (sessionStorage.getItem('logged')=="true")?true:false;
    if (sessionStorage.getItem('logged')=="true") {
      this.LoginService.getPermisos()?.subscribe(res =>{
        var permisos = res.data
        sessionStorage.setItem("permisos",permisos)
        this.permisos = this.LoginService.leerPermisos()
        this.getModulos()
      })
    }
    // console.log(this.isLogged)
  }

  getModulos(){
    this.permisos = this.permisos
    if (this.permisos != undefined && this.permisos != null) {
      this.modulos = new Set(this.permisos.map((e:any) => e.nombre_grupo))
      // console.log(this.permisos.rol)
      // console.log(this.modulos)
    }
  }

  Permisos(){
    this.LoginService.getPermisos()?.subscribe(res=>{

      var permisos = res.data
      // console.log(permisos)
      sessionStorage.setItem("permisos", permisos)
      this.permisos = this.LoginService.leerPermisos()
      // console.log(this.permisos)
    })
  }
}
