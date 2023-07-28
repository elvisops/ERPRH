import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ColaboradoresPermanentesService } from '../../colaboradores-permanentes.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ExportAsService } from 'ngx-export-as';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponentComponent } from './confirmation-dialog-component/confirmation-dialog-component.component';
// import { MatDialog } from '@angular/material/dialog';

//formatear la fecha
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { format } from 'date-fns';

@Component({
  selector: 'app-activar-colaborador',
  templateUrl: './activar-colaborador.component.html',
  styleUrls: ['./activar-colaborador.component.css'],
})
export class ActivarColaboradorComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: ColaboradoresPermanentesService,
    private auth: AuthService, // @Inject(MAT_DIALOG_DATA) public data:any
    private exportAsService: ExportAsService,
    private dialogRef: MatDialogRef<ActivarColaboradorComponent>,
    private snackBar: MatSnackBar, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {}

  identidad: string = this.data.Identidad;
  nombre: string = this.data.Nombre;

  fechaIngreso!: string 
  fechaFin!: string 

  fechaIng!: string;
  fechaF!: string;
  duracion!: string;


  ngOnInit(): void {
    
  }



  ActivarColaborador() {
    this.fechaIng = this.datePipe.transform(this.fechaIngreso, 'yyyy-MM-dd') ?? '';
    this.fechaF = this.datePipe.transform(this.fechaFin, 'yyyy-MM-dd') ?? '';
    // alert(this.fechaIng +" "+ this.fechaF)
    if (!this.fechaIng || !this.fechaF) {
      this.service.notificacion('Debe ingresar las fechas de inicio y fin');
      return;
    }
    if((this.fechaIng>this.fechaF) || (this.fechaF<this.fechaIng)){
      this.service.notificacion("La fecha de finalizacion debe ser mayor a la de inicio de contrato")
      return
    }

    this.openConfirmationModal();

    // this.service.notificacion(this.fechaIngreso+' '+this.fechaFin);
  }

  openConfirmationModal() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '400px',
      data: `Se Activara el agente con identidad: ${this.identidad}`,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.service.notificacion("confirma si");
        // servicio para actualizar el estado
        this.service.ActivarEmpleado(this.identidad, this.fechaIng, this.fechaF).subscribe(r =>{
          var respuesta = this.auth.desencriptar(r.response)
          respuesta = (JSON.parse(respuesta))
          respuesta = respuesta[0]
          console.log(respuesta)
          if (respuesta.status == 1) {
            this.service.notificacion(respuesta.message)
            // llamar al proc para la bitacora
            this.calcularDuracion(this.fechaIng,this.fechaF)
            // alert(this.duracion);
            this.service.bitacoraEmpleado(this.identidad,this.nombre,this.fechaIng,this.fechaF,this.duracion).subscribe(r => {
              var respuesta = this.auth.desencriptar(r.response)
              respuesta = JSON.parse(respuesta)
              console.log(respuesta)
            })

            this.CloseDialog()
          }else{
            this.service.notificacion(respuesta.message)
          }
          
          
        })
      } else {
        // Acción cancelada
        // Realiza alguna acción de cancelación si es necesario
        this.service.notificacion("confirma no");
      }
    });
  }

  // calcularMesesEntreFechas(fechaInicioStr: string, fechaFinStr: string): void {
  //   // const fechaInicio = new Date(fechaInicioStr);
  //   // const fechaFin = new Date(fechaFinStr);
  
  //   // const diffInMonths = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 +
  //   //   (fechaFin.getMonth() - fechaInicio.getMonth());
  
  //   // this.duracion = diffInMonths;

  //   const fechaInicio = new Date(fechaInicioStr);
  //   const fechaFin = new Date(fechaFinStr);
  
  //   const diffInMilliseconds = fechaFin.getTime() - fechaInicio.getTime();
  //   const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
  //   this.duracion = diffInDays;
  // }

  calcularDuracion(fechaInicioStr: string, fechaFinStr: string): void {
    const fechaInicio = new Date(fechaInicioStr);
    const fechaFin = new Date(fechaFinStr);
  
    const diffInMilliseconds = fechaFin.getTime() - fechaInicio.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
    if (diffInDays > 31) {
      const diffInMonths = Math.floor(diffInDays / 30);
      const remainingDays = diffInDays % 30;
  
      if (remainingDays === 0) {
        this.duracion =  `${diffInMonths} mes(es)`;
      } else {
        this.duracion =  `${diffInMonths} mes(es) y ${remainingDays} día(s)`;
      }
    } else if (diffInDays === 1) {
      this.duracion =  '1 día';
    } else {
      this.duracion =  `${diffInDays} días`;
    }
  }
  

  // formatDate(date: Date): string {
  //   if (date instanceof Date) {
  //     const day = date.getDate().toString().padStart(2, '0');
  //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //     const year = date.getFullYear().toString();
  //     return `${day}/${month}/${year}`;
  //   } else {
  //     return '';
  //   }
  // }
  
  // onInputChange(event: any) {
  //   const value = event.target.value;
  //   const parts = value.split('/');
  //   const day = parseInt(parts[0]);
  //   const month = parseInt(parts[1]) - 1;
  //   const year = parseInt(parts[2]);
  //   this.fechaFin = new Date(year, month, day);
  // }
  


  CloseDialog() {
    this.dialogRef.close();
  }
}
// <div class="col-lg-6">
// <mat-form-field appearance="outline" class="w-100 my-2">
//   <mat-label>Proyecto</mat-label>
//   <input matInput placeholder="Buscar proyecto" [(ngModel)]="searchTermProyecto">
//   <mat-select [(ngModel)]="idProyecto" (ngModelChange)="onProyectoChange()">
//     <mat-option></mat-option>
//     <mat-option *ngFor="let proyecto of 
//        applyFilter(listaProyectos, searchTermProyecto, 'Proyecto')" [value]="proyecto.idProyecto">
//       {{ proyecto.Proyecto }}
//     </mat-option>
//   </mat-select>
// </mat-form-field>
// </div>