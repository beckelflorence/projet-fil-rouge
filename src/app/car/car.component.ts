import { Component, Input, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  @Input() carName: string;
  @Input() carOnAir: string;
  @Input() carAffiche: string;
  @Input() synopsis: string;
  @Input() date: string;
  @Input() id: number;


  constructor(
    private Car: CarService
  ) { }

  ngOnInit() {
  }

  getOnAir() {
    return this.carOnAir;
  }


  changeColor() {
    if(this.carOnAir == 'Supercar') {
      return "rgb(0, 149, 213)";

    }else if(this.carOnAir == 'Citadine') {
      return 'red';

    } else {
      console.log('Error: Unexpected onAir value');

    }
  }

  removeCar(id: any) {
    this.Car.deleteCar(id);
  }

}
