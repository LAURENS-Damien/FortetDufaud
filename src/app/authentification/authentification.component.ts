import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  seConnecterForm: FormGroup;
  messageErreur: string;

  constructor(private formBuilder: FormBuilder,
              private authentificationService: AuthentificationService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.seConnecterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.seConnecterForm.get('email').value;
    const password = this.seConnecterForm.get('password').value;
    this.authentificationService.seConnecter(email, password).then(
      () => {
        this.router.navigate(['/calendrier']);
      },
      (error) => {
        this.messageErreur = error;
      }
    );
  }

}
