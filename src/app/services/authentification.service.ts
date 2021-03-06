import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthentificationService {

  constructor() { }

  seConnecter(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  seDeconnecter() {
    firebase.auth().signOut();
  }

}
