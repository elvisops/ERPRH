

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap} from 'rxjs';
import { Observable, of} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';   
import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http :HttpClient,
    private snack: MatSnackBar,
  ) { }

  api = environment.api

  encriptar(text:any){
    return CryptoJS.AES.encrypt(text, environment.crypto_key);
  }

  desencriptar(textEncripted:any):any{
    var info = CryptoJS.AES.decrypt(textEncripted,environment.crypto_key);
    var respuesta = info.toString(CryptoJS.enc.Utf8)
    return respuesta
  }

  mkpayload(data:any){
    data = this.encriptar(JSON.stringify(data)).toString();
    return data;
  }

  mkurl_dec(txt:any){
    var tmp = atob(txt.toString()).toString()
    tmp = this.desencriptar(tmp).toString()
    return tmp
  }

  notificacion(msg:string):void{
    this.snack.open(msg,"Cerrar",{
      horizontalPosition:"center",
      verticalPosition:"top",
      duration: 5000
    })
  }

  ParseToken(){
    var token = sessionStorage.getItem('token')
    token = this.desencriptar(token)
    return token
  }

  encryptMD5(text:any){
    const password = 'ops_'+text;
    return CryptoJS.MD5(password).toString();
  }
}
