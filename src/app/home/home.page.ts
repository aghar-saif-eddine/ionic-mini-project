import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'firebase/auth';
import {AuthServiceService} from "../authetication.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cars: any[] = [];
  constructor(private authService: AuthServiceService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.getCars().subscribe(cars => {
      this.cars = cars;
      console.log(this.cars);  // Check if the data is coming through
    });
  }

  deleteCar(carId: string) {
    this.authService.deleteCar(carId);
  }

  editCar(car: any) {
    this.authService.editCar(car);
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/landing'])
    })
  }
}
