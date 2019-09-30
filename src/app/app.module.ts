import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomersService } from './services/customers.service';
import { AddressesService } from './services/addresses.service';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { CustomersComponent } from './components/customers/customers.component';
import { OfficesComponent } from './components/offices/offices.component';
import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    CustomersComponent,
    OfficesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes
  ],
  providers: [
    AddressesService,
    CustomersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
