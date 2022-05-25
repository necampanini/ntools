import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';

import { MaterialModule } from "./material.module";

import * as materialTableHelpers from '../../material-table-helpers';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, ...materialTableHelpers.components],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
