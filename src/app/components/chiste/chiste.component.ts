import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chiste',
  templateUrl: './chiste.component.html',
  styleUrls: ['./chiste.component.scss']
})
export class ChisteComponent implements OnInit {

  // Frase que se obtiene de la API Restful de ChuckNorris
  frase: any = {
    categories: [],
    created_at: '',
    icon_url: '',
    id: '',
    updated_at: '',
    url: '',
    value: ''
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

  // Método para obtener una frase de la API Restful
  // a través del servicio de DataService
  nuevaFrase() {
    this.dataService.obtenerFraseRandom().subscribe((response) => {
      this.frase = response;
    })
  }



}
