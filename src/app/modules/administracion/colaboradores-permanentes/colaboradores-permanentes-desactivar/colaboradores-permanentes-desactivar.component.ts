import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ColaboradoresPermanentesService } from '../colaboradores-permanentes.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-colaboradores-permanentes-desactivar',
  templateUrl: './colaboradores-permanentes-desactivar.component.html',
  styleUrls: ['./colaboradores-permanentes-desactivar.component.css']
})
export class ColaboradoresPermanentesDesactivarComponent implements OnInit {

  listaMotivos: any[] = [
    { ID: 'D', MOTIVO: 'Renuncia' },
    { ID: 'AB', MOTIVO: 'Abandono' },
    { ID: 'NR', MOTIVO: 'Finalización de Contrato' }
  ]

  constructor(
    private dialogRef: MatDialogRef<ColaboradoresPermanentesDesactivarComponent>,
    private service: ColaboradoresPermanentesService,
    private auth: AuthService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  identidad: string = this.data.Identidad
  motivo:string = ""
  fechaBaja: string = ""
  formattedFechaBaja!: Date;
  comentario: string = ""

  motivoInvalida: boolean = false
  fechaBajaInvalida: boolean = false
  comentarioInvalida: boolean = false
  recontratacionInvalida: boolean = false

  recontratacion: string = ""
  rdRecontratacion: boolean = false
  comentarioPorque: string = ""


  ngOnInit(): void {

  }

  CloseDialog() {
    this.dialogRef.close()
  }

  ValidarInpust(){
    if (!this.motivoInvalida) {
      this.motivoInvalida = true;
    }

    if(!this.fechaBajaInvalida){
      this.fechaBajaInvalida = true
    }

    if (!this.comentarioInvalida) {
      this.comentarioInvalida = true
    }

    if (!this.recontratacionInvalida) {
      this.recontratacionInvalida = true
    }

    if (this.motivo == "" || this.fechaBaja == "" || this.comentario == "" || this.recontratacion == "") {
      this.service.notificacion("Debe Ingresar los datos solicitados")
      return
    }

    this.DesactivarColaborador()
  }

  DesactivarColaborador(){
    // this.service.notificacion("Bien")
    this.fechaBaja = this.datePipe.transform(this.fechaBaja,'yyyy-MM-dd') ?? '';

    var idMotivo = 0;
    if (this.motivo == 'NR') {
      idMotivo = 6
    }else if(this.motivo == 'AB'){
      idMotivo = 7
    }else{
      idMotivo = 5
    }

    this.service.Desactivar(this.identidad,idMotivo,this.motivo,this.fechaBaja,this.comentario,this.recontratacion,this.comentarioPorque).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.dialogRef.close()
        
      }else{
        this.service.notificacion(respuesta.message)
      }
    })
  }

  onRadioChange() {
    if (this.recontratacion == "Si") {
      this.rdRecontratacion = false
    }else{
      this.rdRecontratacion = true
    }
  }

  // onFechaBajaChange(event: Date): void {
  //   // Asigna la fecha formateada al modelo
  //   this.fechaBaja = this.formatDate(event);
  // }

  // private formatDate(date: Date): string {
  //   if (date) {
  //     const day = date.getDate().toString().padStart(2, '0');
  //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //     const year = date.getFullYear();
  //     return `${day}/${month}/${year}`;
  //   }
  //   return '';
  // }

}
