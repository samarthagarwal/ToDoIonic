import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  todos: any[] = [];
  uid: string;

  constructor(private activatedRoute: ActivatedRoute, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.uid = this.activatedRoute.snapshot.paramMap.get("uid");
    console.log(this.uid)
    this.getTodos();
  }

  ngOnInit() {
  }

  async getTodos() {
    let querySnapshot: firebase.firestore.QuerySnapshot = await firebase.firestore().collection("Todos")
    .where("todo_owner", "==", this.uid)
    .where("todo_completed", "==", false)
    .orderBy("todo_finish_date", "asc")
    .get();

    this.todos = querySnapshot.docs;
  }

  async create() {
    let alert = await this.alertCtrl.create({
      header: "New ToDo",
      subHeader: "Fill out the information",
      inputs: [{
        type: "text",
        name: "todo_title",
        placeholder: "Buy Groceries"
      }, {
        type: "text",
        name: "todo_description",
        placeholder: "Get a lot of green stuff"
      }, {
        type: "date",
        name: "todo_finish_date",
        placeholder: "25/01/2020"
      }], buttons: [{
        text: "Cancel"
      }, {
        text: "Create",
        handler: async (data) => {
          console.log(data);

          let date = new Date(data.todo_finish_date);
          
          await firebase.firestore().collection("Todos").add({
            "todo_title": data.todo_title,
            "todo_description": data.todo_description,
            "todo_finish_date": date,
            "todo_creation_date": new Date(),
            "todo_owner":  this.uid,
            "todo_completed": false
          });

          console.log("Todo created successfully.");

          let toast = await this.toastCtrl.create({
            message: "Todo created successfully.",
            duration: 3000
          });
      
          toast.present();

          this.getTodos();
        }
      }]
    })

    alert.present();
  }


  async markCompleted(todo: firebase.firestore.QueryDocumentSnapshot) {
    // Mark as completed

    await firebase.firestore().collection("Todos").doc(todo.id).update({
      "todo_completed": true
    })

    // Display toast

    let toast = await this.toastCtrl.create({
      message: "Todo marked as completed successfully.",
      duration: 3000
    });

    toast.present();
    
    // Refresh the list
    this.getTodos();
  }

  async delete(todo: firebase.firestore.QueryDocumentSnapshot) {
    // delete the doc

    await firebase.firestore().collection("Todos").doc(todo.id).delete();

    // Display toast

    let toast = await this.toastCtrl.create({
      message: "Todo has been deleted successfully.",
      duration: 3000
    });

    toast.present();
    
    // Refresh the list
    this.getTodos();
  }

}
