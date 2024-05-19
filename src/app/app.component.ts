import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule} from '@angular/forms'
import { DataService } from './services/covid.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  departamentos: any[] = [];
  departamentoInput: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllDepartamentos().subscribe(res=>{
      this.departamentos = res
    },(error)=>{
      console.log('Error al obtener todos los datos', error)
    })
  }

  buscarDepartamentos() {
    this.dataService.getDepartamentos(this.departamentoInput).subscribe(res=>{
      this.departamentos = res
    },(error)=>{
      console.log('Error al obtener los datos filtrados', error)
    })
  }
}
