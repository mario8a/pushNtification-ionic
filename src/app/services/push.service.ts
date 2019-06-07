import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  mensajes :any[] = [
    {
      title: 'Titulo de la  push',
      body: 'Este es el body del push',
      date: new Date()
    }
  ];

  configuracionInicial() {


    //(OneSignar, Firebase)
    this.oneSignal.startInit('348c6661-d308-49d3-9f8f-6585e1103b83', '168983439395');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
     // do something when notification is received
     console.log('Notificacion recivida', noti);
     this.notificacionRecibida(noti);
    });
    
    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('Notificacion abierta', noti);
    });
    
    this.oneSignal.endInit();
  }

  notificacionRecibida(noti: OSNotification) {

    const payload = noti.payload;

    const existePush = this.mensajes.find(mensaje => mensaje.notificationID === payload.notificationID)

    if(existePush) {
      return;
    }

    this.mensajes.unshift(payload);

  }
}
