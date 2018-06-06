import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModalModule  } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData  } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { DemoUtilsModule } from './calendrier/demo-utils/module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { AppRoutingModule } from './app.routing.module';
import localeFr from '@angular/common/locales/fr';
import { DesherbageFumureComponent } from './desherbage-fumure/desherbage-fumure.component';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    CalendrierComponent,
    DesherbageFumureComponent
  ],
  imports: [
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // Calendar
    CalendarModule.forRoot(),
    DragAndDropModule,
    DemoUtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
