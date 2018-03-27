import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { DesherbageFumureComponent } from './desherbage-fumure/desherbage-fumure.component';

const routes: Routes = [
  { path: '', redirectTo: '/authentification', pathMatch: 'full' },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'calendrier', component: CalendrierComponent },
  { path: 'desherbageFumure', component: DesherbageFumureComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
