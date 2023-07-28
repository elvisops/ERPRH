import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ColaboradoresPermanentesService } from '../../colaboradores-permanentes.service';
import { HistoricoColaboradoresInactivos } from './historico-colaboradores-inactivos';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {
  ExportAsService,
  ExportAsConfig,
  SupportedExtensions,
} from 'ngx-export-as';

//generar contrato
import { HttpClient } from '@angular/common/http';
// import { saveAs } from 'file-saver';
// import Docxtemplater from 'docxtemplater';
// declare const saveAs: any;
// import { saveAs } from 'file-saver';
// // import * as Docxtemplater from 'docxtemplater';
// declare const require: any;
// const Docxtemplater = require('docxtemplater');
// import { Document, Paragraph, TextRun, Packer } from 'docx';
// import { saveAs } from 'file-saver';


@Component({
  selector: 'app-historico-colaboradores-inactivos',
  templateUrl: './historico-colaboradores-inactivos.component.html',
  styleUrls: ['./historico-colaboradores-inactivos.component.css'],
})
export class HistoricoColaboradoresInactivosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    // private auhtService: AuthService,
    private service: ColaboradoresPermanentesService,
    private auth: AuthService,
    private exportAsService: ExportAsService,
    private dialogRef: MatDialogRef<HistoricoColaboradoresInactivosComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  identidad: string = this.data.Identidad;
  nombre: string = this.data.Nombre;

  listaHistorico: HistoricoColaboradoresInactivos[] = [];
  DataSource: MatTableDataSource<HistoricoColaboradoresInactivos> =
    new MatTableDataSource();
  Columnas: string[] = [
    'Descargar Contrato',
    'id',
    'Identidad',
    'Nombre',
    'fechabaja',
    'Inicio',
    'Fin',
    'Duracion',
    'NuevaFecha',
    'Area',
    'Cartera',
    'Proyecto',
    'Usuario',
    'FechaIngreso',
    'Observacion',
  ];
  ngOnInit(): void {
    // alert(this.identidad)
    this.genHistorico();
  }

  genHistorico() {
    this.service.getHistoricoInactivos(this.identidad).subscribe((r) => {
      var data = JSON.parse(this.auth.desencriptar(r.data));
      console.log(data);
      this.listaHistorico = data;
      this.FillTable(this.listaHistorico);
    });
  }

  exportTableAs(format: SupportedExtensions) {
    const exportConfig: ExportAsConfig = {
      type: format,
      elementIdOrContent: 'tablaHistorico',
    };
    this.exportAsService.save(exportConfig, 'Datos').subscribe(() => {});
  }
  // const url = 'assets/Docs/plantilla_contrato.docx';
  // generarDocumento(): void {
  //   const doc = new Document();

  //   // Agrega el contenido del documento
  //   const paragraph = new Paragraph();
  //   const run = new TextRun('Fecha: ' + new Date().toLocaleDateString());
  //   paragraph.addRun(run);
  //   doc.addParagraph(paragraph);

  //   // Descarga el documento
  //   Packer.toBlob(doc).then(blob => {
  //     saveAs(blob, 'documento.docx');
  //   });
  // }

  // generarDocumento(): void {
  //   const url = 'assets/Docs/plantilla_contrato.docx';

  //   this.http.get(url, { responseType: 'arraybuffer' }).subscribe((buffer: ArrayBuffer) => {
  //     const doc = new Docxtemplater();
  //     doc.loadZip(buffer);

  //     // Datos a reemplazar en la plantilla
  //     const data = {
  //       variable1: 'Valor 1',
  //       variable2: 'Valor 2',
  //       // Agrega más variables según sea necesario
  //     };

  //     doc.setData(data);
  //     doc.render();

  //     const documentoGenerado = doc.getZip().generate({ type: 'blob' });
  //     saveAs(documentoGenerado, 'nombre-del-documento.docx');
  //   });
  // }

  FillTable(Datos: HistoricoColaboradoresInactivos[]) {
    this.DataSource = new MatTableDataSource(Datos);
    this.DataSource.sort = this.sort;
    this.DataSource.paginator = this.paginator;
  }

  Filtrar(evt: Event) {
    const valorFiltrado = (evt.target as HTMLInputElement).value;
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
    }
  }

  CloseDialog() {
    this.dialogRef.close();
  }
}
