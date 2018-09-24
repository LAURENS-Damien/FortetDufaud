import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyBcmCy8lJZgtKPr7N0EF7to1R_BGRImKGI",
      authDomain: "fortetdufaud-c8352.firebaseapp.com",
      databaseURL: "https://fortetdufaud-c8352.firebaseio.com",
      projectId: "fortetdufaud-c8352",
      storageBucket: "fortetdufaud-c8352.appspot.com",
      messagingSenderId: "458749581331"
    };
    firebase.initializeApp(config);
  }
}
