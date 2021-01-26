import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs' ;


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private http: HttpClient
  ) { 
    this.getCar();
  }

  carSubject = new Subject<any[]>();

  private carList = [];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type' : 'application/json'
    })
  }


  emitCarSubject() {
    this.carSubject.next(this.carList.slice());
  }

  setOnAir() {
    for (const i of this.carList) {
      i.onAir = 'Citadine';
    }
    this.emitCarSubject();
    
  }

  setOnBR() {
    for (const iterator of this.carList) {
      iterator.onAir = 'Supercar';
    }
    this.emitCarSubject();
  }

  switchOnAir(index: number) {
    this.carList[index].onAir = 'Citadine';
    this.emitCarSubject();
  }

  switchOnBR(index: number) {
    this.carList[index].onAir = 'Supercar';
    this.emitCarSubject();
  }

  getCarbyId(id: number) {
    return this.http.get<any>('/api/cars/' + id);
  }

  addCar(car: any) {
    this.http.post<any>('/api/cars', car, this.httpOptions).subscribe(res => {
      this.carList.push(res);
      this.emitCarSubject();
    });
  }

  getCar() {
    this.http.get<any>('/api/cars').subscribe((res)=> {
      this.carList = res;
      this.emitCarSubject();
    });
  }

  modifCar(car : any) {
    var index = this.carList.findIndex(
      (carToModif) => {
        if(carToModif._id == car._id) {
          return true;
        }
      }
    )
    this.carList.splice(index, 1, car);
    this.emitCarSubject();
    return this.http.put<any>('/api/cars/' + car._id, car, this.httpOptions);
  } 

  deleteCar(id: any) {
  this.http.delete<any>('/api/cars/' + id).subscribe(res => {
    var index = this.carList.findIndex(
      (carToDelete) => {
      if(carToDelete._id == id) {
        return true;
      }
    }
  )
  this.carList.splice(index, 1);
  this.emitCarSubject();
  })
  }
}
