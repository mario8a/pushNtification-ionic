import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  configuracionInicial() {
    //(OneSignar, Firebase)
    this.oneSignal.startInit('348c6661-d308-49d3-9f8f-6585e1103b83', '168983439395');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
     // do something when notification is received
     console.log('Notificacion recivida', noti);
    });
    
    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('Notificacion abierta', noti);
    });
    
    this.oneSignal.endInit();
  }
}
