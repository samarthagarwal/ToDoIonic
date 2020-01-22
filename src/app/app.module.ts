import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FCM } from '@ionic-native/fcm/ngx';

import * as firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyApzWOWWt7F4KuNoVV0gZXA7nTs53AklKQ",
  authDomain: "todoionic-ad2e2.firebaseapp.com",
  databaseURL: "https://todoionic-ad2e2.firebaseio.com",
  projectId: "todoionic-ad2e2",
  storageBucket: "todoionic-ad2e2.appspot.com",
  messagingSenderId: "332539249552",
  appId: "1:332539249552:web:19a00718733913a3d36915"
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
