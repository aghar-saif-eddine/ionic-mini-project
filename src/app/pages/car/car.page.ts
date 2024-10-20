import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../authetication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
  carForm: FormGroup;
  cars: any[] = [];

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {
  }

  ngOnInit() {
    // Initialize car form with validation
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
    });
  }

  submitCar() {
    if (this.carForm.valid) {
      this.authService.addCar(this.carForm.value)
      this.carForm.reset();
      this.router.navigate(['/home'])
    }
  }


}
