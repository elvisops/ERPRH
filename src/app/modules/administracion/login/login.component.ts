import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private service:LoginService,
    private snack: MatSnackBar,
    private auth: AuthService,
    private router: Router,
  ){}

  hide = true;
  identidad: string = "";
  password: string = "";
  inactive: boolean = false;
  inactiveMsg: string = "";
  
  ngOnInit(): void {
    this.validarSesionActiva()
  }

  notificacion(msg: string){
    this.snack.open(msg, "cerrar",{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    })
  }

  setActive(){
    if(this.inactive){
      this.inactive = false
    }
  }

  validarSesionActiva(){
    if (sessionStorage.getItem('logged') == "true") {
      this.router.navigate(['/inicio'])
    }
  }

  IniciarSesion(){
    if (this.inactive) {
      this.notificacion("!No se puede ingresar al sistema con un identidad bloqueado!")
      return
    }

    if (this.identidad == "" || this.identidad.length<1 || this.password == "" || this.password.length<1) {
      this.notificacion("Ingrese el identidad y contraseña")
      return
    }

    var passEncrypt = this.auth.encryptMD5(this.password)

    this.service.login(this.identidad, passEncrypt).subscribe(res =>{
      var respuesta = JSON.parse(this.auth.desencriptar(res.response))
      // console.log(respuesta)
      // respuesta = respuesta[1]
      // console.log(respuesta[0].status)
      // console.log(respuesta.status)
      console.log(respuesta)
      if (respuesta[0].status == 1) {
        this.notificacion("Bienvenido " + this.identidad)//puedo mandar el name desde la base de datos, necesito el usuario tambien


        // console.log(respuesta[0].data)
        // var obj = JSON.parse(respuesta[0].data)
        // console.log(obj)
        // obj = obj[0]

        // var token = this.auth.encriptar(obj.token).toString()

        // sessionStorage.setItem("token", token)

        this.service.setSessionStorage()

        window.location.href ="./"
      }else{
        // if (respuesta.data == "-1") {
        //   this.inactive = true
        //   this.inactiveMsg = "Su identidad esta bloqueado o deshabilitado, pongase en contacto con un administrador"
        // }
        this.notificacion(respuesta[0].message)
      }
    })
  }
}
