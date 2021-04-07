import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**
   * Método para obtener de la API Restful una
   * frase aleatoria que pintar en la pantalla
   */
  obtenerFraseRandom(): Observable<any> {
    return this.http.get('https://api.chucknorris.io/jokes/random');
  }


}
