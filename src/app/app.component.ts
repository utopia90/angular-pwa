import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-pwa';

  /**
   * @param updates ServiceWorker y sirve para controlar cada vez que haya una nueva versión
   * @param swPush ServiceWorker y sirve para gestionar notificaciones push
   */
  constructor(
    private updates: SwUpdate,
    private swPush: SwPush
  ) {}

  ngOnInit() {
    // Recargar la Caché
    this.recargarChache();
  }

  /**
   * En caso de que haya una nueva versión de la aplicación
   * vamos a solicitar al usuario que actualice el serviceWorker
   * con las nuevas implementaciones
   */
  recargarChache() {
    if (this.updates.isEnabled) {
      this.updates.available.subscribe((event) => {
        // Cada vez que haya un cambio en la aplicación
        // forzamos al refresco de la misma siempre que el usuario
        // confirme la pregunta que le hacemos
        if (confirm('Hay una nueva versión disponible. ¿Quieres actualizar la app?')) {
          this.updates.activateUpdate().then(() => {
            // Reinicio de la pantalla y así los cambios se ven reflejados
            window.location.reload();
          });
        }
      });
    }



  }




}
