import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { FormsModule } from '@angular/forms';
import { CarService } from './services/car.service';
import { CarNewComponent } from './car-new/car-new.component';
import { CarModifComponent } from './car-modif/car-modif.component';
import { CarListComponent } from './car-list/car-list.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {
    path: 'cars',
    component: CarListComponent
  },
  {
    path: 'new',
    component: CarNewComponent
  },
  {
    path: 'modif/:id',
    component: CarModifComponent
  },
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CarNewComponent,
    CarModifComponent,
    CarListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    CarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
