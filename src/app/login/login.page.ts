import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: "",
    password: ""
  }

  constructor(private router: Router, private toastCtrl: ToastController, private fcm: FCM, private platform: Platform) { 


    this.platform.ready().then(() => {
      // application is ready to use cordova plugins

      this.fcm.getToken().then((token) => {
        console.log(token);
        alert(token);
      })

    })
  }

  ngOnInit() {
  }

  async login() {

    try {
      
      let userCredential: firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password);

      console.log(userCredential);

      let toast = await this.toastCtrl.create({
        header: "Congratulations",
        message: "You have been logged in successfully.",
        duration: 3000
      });
  
      toast.present();
  
      // Navigate the user to todo page
      this.router.navigateByUrl("todos/" + userCredential.user.uid);

    } catch(ex) {
      let toast = await this.toastCtrl.create({
        header: "Something went wrong",
        message: ex.message,
        duration: 3000
      });
  
      toast.present();
    }

  }

}
