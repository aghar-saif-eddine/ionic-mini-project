import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../authetication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  email :any
  constructor(private authService:AuthServiceService) { }

  ngOnInit() {
    this.authService.getProfile().then(user => {
      this.email = user?.email;
      console.log(user?.email);
    }).catch(error => {
      console.error('Error getting user profile:', error);
    });
  }

}
