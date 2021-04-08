import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(public http: HttpClient) { }

  suscribirse(push: PushSubscription) {
    const url = 'http://localhost:3000/subscribe';
    return this.http.post(url, push);
  }

}
