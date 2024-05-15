import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddEducationModalComponent } from './modals/add-education-modal/add-education-modal.component';
import { AddExperienceModalComponent } from './modals/add-experience-modal/add-experience-modal.component';
import { AddSkillModalComponent } from './modals/add-skill-modal/add-skill-modal.component';
import { AddOtherModalComponent } from './modals/add-other-modal/add-other-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddEducationModalComponent,
    AddExperienceModalComponent,
    AddSkillModalComponent,
    AddOtherModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
