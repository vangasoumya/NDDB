import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    $(".button-collapse").sideNav({
      menuWidth: 250, 
    });
    $('#openinfo').modal();
    // $('.collapsible').collapsible({
    //   accordion: true,
    // });
    // $('#sessioninfo').modal();
    }
  // user1Click(){
  //   console.log("user 1 clicked");
  //   $('#sessioninfo').modal('open');
  
  // }
  onLogoutClick() {
      this.authService.logout();
      // this.flashMessage.show('You are logged out', {
      //   cssClass: 'alert-success', timeout: 3000
      // });
      this.router.navigate(['/login']); 
      return false;
      //console.log("logged out");
     
    }

}
