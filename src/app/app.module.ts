import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FormControlModule } from '@joster-dev/form-control';
import { IconModule } from '@joster-dev/icon';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormControlModule,
    IconModule,
    ServiceWorkerModule.register(
      'ngsw-worker.js',
      { enabled: environment.production }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
