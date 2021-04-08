import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.scss']
})
export class SuscripcionComponent implements OnInit {

  // VAPID KEY PÚBLICA de Web Push
  readonly VAPID_KEY = 'BFdgtv35vCLg4Hqd-I8dzsR2wZzdWj_zqycW9bkXUp_TPGu-aYflPdx8fmPyt2837BoeYFU_sC8Khdp_kvmzQSU';

  constructor(
    private notificacionesService: NotificacionesService,
    private swPush: SwPush,
    private updates: SwUpdate
  ) { }

  ngOnInit(): void {
  }

  /**
   * Método que realiza la petición para recibir una notificación Push
   * desde el Push Server
   */
  suscribirseANewsLetter() {
    if (this.updates.isEnabled) {
      this.swPush.requestSubscription(
        {
          serverPublicKey: this.VAPID_KEY
        }
      ).then((sub: PushSubscription) => {
        this.notificacionesService.suscribirse(sub).subscribe();
      });
    }
  }
}
