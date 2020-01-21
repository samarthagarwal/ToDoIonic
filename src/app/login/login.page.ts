import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';

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

  constructor(private router: Router, private toastCtrl: ToastController) { }

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
