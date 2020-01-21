import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user = {
    email: "",
    password: ""
  }

  constructor(private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }

  async signup() {

    try {
    let userCredential: firebase.auth.UserCredential = await firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password);

    let toast = await this.toastCtrl.create({
      header: "Congratulations",
      message: "Your account has been created successfully.",
      duration: 3000
    });

    toast.present();

    // Navigate the user to todo page
    this.router.navigateByUrl("todos/" + userCredential.user.uid);

    } catch(ex){
      console.log(ex);
      let toast = await this.toastCtrl.create({
        header: "Something went wrong",
        message: ex.message,
        duration: 3000
      });

      toast.present();
    }
  }

}
