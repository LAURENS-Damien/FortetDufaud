import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-desherbage-fumure',
  templateUrl: './desherbage-fumure.component.html',
  styleUrls: ['./desherbage-fumure.component.css']
})

@Injectable()
export class DesherbageFumureComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.enregistrerProduitsDesherbage();
  }

  private produitsDesherbage = [
    {
      id: 1,
      date: '27/03/2018',
      zone: 'Sous le Rang',
      surface: '35',
      produitsDoses: 'Glyphosate'
    },
    {
      id: 2,
      date: '27/03/2018',
      zone: 'Sous le Rang',
      surface: '45',
      produitsDoses: 'Glyphosate'
    }
  ];

  enregistrerProduitsDesherbage() {
    this.httpClient
      .post('https://fortetdufaud-c8352.firebaseio.com/produitsDesherbage.json', this.produitsDesherbage)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  

}
