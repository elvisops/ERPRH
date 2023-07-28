import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../administracion/login/login.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Proyectos } from './public';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
  // standalone: true,
  // imports: [ CurrencyPipe]
})
export class PublicComponent implements OnInit {
  permisos: any = [];
  modulos: any = [];

  // variables del dashboard
  empHora: string = '';
  empPermanentes: string = '';
  empRenovar: string = '';
  bajas: string = '';

  //para llenar la tabla
  listaProyectos: Proyectos[] = [];

  DataSource: MatTableDataSource<Proyectos> = new MatTableDataSource();
  Columnas: string[] = [
    'Area',
    'Activos',
    'Inicio',
    'Bajas',
    'Rotacion',
    'RotacionAnual',
  ];
  // Columnas: string[] =["Area", "Activos", "Bajas"]

  //chart
  chart: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //chart
  // @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('barChart', { static: false }) barChart!: ElementRef;
  constructor(private loginService: LoginService, private auth: AuthService) {}

  ngOnInit(): void {
    this.permisos = this.loginService.leerPermisos();
    console.log(this.permisos);
    this.getModulos();
    this.genDashboard();
    this.genDashboard2();
  }

  // ngAfterViewInit() {
  //   // Acceder al elemento barChart aquí
  //   console.log(this.barChart.nativeElement);
  // }

  getModulos() {
    this.permisos = this.permisos;
    if (this.permisos != undefined && this.permisos != null) {
      this.modulos = new Set(this.permisos.map((e: any) => e.nombre_grupo));

      // console.log(this.modulos)
    }
  }

  genDashboard() {
    this.loginService.getDashboard().subscribe((r) => {
      var data = JSON.parse(this.auth.desencriptar(r.data));
      // console.log(data)
      const objeto = data[0];

      this.empHora = objeto.empH;
      this.empPermanentes = objeto.empP;
      this.empRenovar = objeto.empV;
      this.bajas = objeto.bajas;
      // console.log(objeto.empP)
      // console.log(typeof objeto);
    });
  }

  genDashboard2() {
    this.loginService.getDashboard2().subscribe((r) => {
      var data = JSON.parse(this.auth.desencriptar(r.data));
      console.log(data);

      const listaProyectos = data.map((item: Proyectos) => ({
        Area: item.Area,
        Activos: item.Activos,
        Bajas: item.Bajas,
        Inicio: item.Activos - item.Bajas,
        Rotacion: ((item.Bajas / item.Activos) * 100).toFixed(2),
        RotacionAnual: ((item.Bajas / item.Activos) * 100 * 12).toFixed(2),
      }));

      // const totalProyectos = data.map((item:Proyectos)=>({
      //   Area: item.Activos+item.Activos
      const sumaInicio = listaProyectos.reduce(
        (total: number, item: Proyectos) => total + item.Inicio,
        0
      );
      const sumaActivos = listaProyectos.reduce(
        (total: number, item: Proyectos) => total + item.Activos,
        0
      );
      const sumaBajas = listaProyectos.reduce(
        (total: number, item: Proyectos) => total + item.Bajas,
        0
      );
      const sumaRotacion = listaProyectos.reduce(
        (total: number, item: Proyectos) => total + item.Rotacion,
        0
      );
      const sumaRotacionAnual = listaProyectos.reduce(
        (total: number, item: Proyectos) => total + item.RotacionAnual,
        0
      );

      // console.log(sumaActivos); // Imprime la suma de la propiedad "Activos" en todas las filas

      // console.log(element)
      this.listaProyectos = listaProyectos;
      console.log(this.listaProyectos);
      this.FillTable(this.listaProyectos);
      this.chartJs();

      // this.getTotalCost()
    });
  }

  /** Gets the total cost of all transactions. */
  getTotal(inicio: keyof Proyectos) {
    return this.listaProyectos
      .map((t) => Number(t[inicio]))
      .reduce((acc, value) => acc + value, 0);
  }

  chartJs() {
    const areas = this.listaProyectos.map((item) => item.Area);
    const Activos = this.listaProyectos.map((item) => item.Activos);
    const Inactivos = this.listaProyectos.map((item) => item.Bajas);
    console.log(areas);
    var myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: areas,
        datasets: [
          {
            label: 'Bajas',
            data: Inactivos,
            backgroundColor: '#ff00b3',
            borderWidth: 1,
          },
          {
            label: 'Activos',
            // data: [12, 19, 3, 5, 2, 3],
            data: Activos,
            // backgroundColor: [
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 206, 86, 0.2)',
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)'
            // ],
            backgroundColor: '#12293f',
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            borderWidth: 1,
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  FillTable(Datos: Proyectos[]) {
    this.DataSource = new MatTableDataSource(Datos);
    this.DataSource.sort = this.sort;
    this.DataSource.paginator = this.paginator;
  }

  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage()
    }
  }
}
