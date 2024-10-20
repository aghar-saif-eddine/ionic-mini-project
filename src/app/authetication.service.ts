import {Injectable} from '@angular/core';
import {AngularFireAuth,} from '@angular/fire/compat/auth';
import {User} from 'firebase/auth';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map} from "rxjs";

export interface Users {
  name: string;
  email: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  cars: any[] = [];

  constructor(public ngFireAuth: AngularFireAuth, private db: AngularFireDatabase) {

  }

  async registerUser(email: string, password: string, name: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password)

  }

  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);

  }

  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);

  }

  async getProfile(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(user as User);
        } else {
          resolve(null);
        }
      }, reject);
    })
  }

  async signOut() {
    return await this.ngFireAuth.signOut();
  }

  // getCars() {
  //   this.db.list('/cars').snapshotChanges().pipe(
  //     map((changes: any[]) =>
  //       changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
  //     )
  //   ).subscribe(cars => {
  //     this.cars = cars;  // Data is assigned here asynchronously
  //     console.log(this.cars);  // This will log the car data correctly
  //   });
  // }
  getCars() {
    return this.db.list('/cars').snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({id: c.payload.key, ...c.payload.val()}))
      )
    );
  }
  // Add a new car to Firebase Realtime Database
  addCar(car: { name: string; model: string; year: number }) {
    this.db.list('/cars').push(car);
  }

  // Delete a car by ID from Firebase Realtime Database
  deleteCar(carId: string) {
    this.db.list('/cars').remove(carId);
  }

  // Edit a car (for simplicity, we'll update the car name)
  editCar(car: any) {
    this.db.list('/cars').update(car.id, car);
  }


}
