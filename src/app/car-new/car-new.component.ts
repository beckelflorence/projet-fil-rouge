import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css']
})
export class CarNewComponent implements OnInit {
newCar : any;

  constructor(
    private router : Router,
    private Car: CarService
  ) { }

  ngOnInit() {
    this.newCar = {
      title: null,
      affiche: null,
      onAir: null,
      synopsis: null,
      date: null
    };
  }

  onSaveCar() {
    // console.log('New car', this.newCar);
    this.Car.addCar(this.newCar);
    this.router.navigate(['/cars']);
  }
}
