import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {
  cars:any= [];
  carSubscription: Subscription;
  constructor(
    private Car: CarService,
  ) { }

  ngOnInit() {
    this.carSubscription = this.Car.carSubject.subscribe((listCar) => {
      this.cars = listCar
    });
    this.Car.emitCarSubject();
  }

  ngOnDestroy() {
    this.carSubscription.unsubscribe();
  }
}
