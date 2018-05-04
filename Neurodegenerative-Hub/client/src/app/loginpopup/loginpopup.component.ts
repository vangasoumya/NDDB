import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import { ValidateService } from '../validate.service';
import { Router ,ActivatedRoute } from '@angular/router';

// import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-loginpopup',
  templateUrl: './loginpopup.component.html',
  styleUrls: ['./loginpopup.component.css']
})
export class LoginpopupComponent implements OnInit {
  returnUrl: string;
  loading = false;
 name: String;
  pass: String;
  role:String;
  regname: String;
  regpass: String;
  email: String;
  // reregpass: String;
  regusername:String;
  successMessage: String = ' ';
  errorMessage: String = ' ';

  constructor( private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    // private flashMessage: FlashMessagesService,
  private validateService: ValidateService) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl'] || '/search');
            console.log("return url in oninit method is ............"+this.returnUrl);
    $(function() {

      $(".input input").focus(function() {
   
         $(this).parent(".input").each(function() {
            $("label", this).css({
               "line-height": "18px",
               "font-size": "18px",
               "font-weight": "100",
               "top": "0px"
            })
            $(".spin", this).css({
               "width": "100%"
            })
         });
      }).blur(function() {
         $(".spin").css({
            "width": "0px"
         })
         if ($(this).val() == "") {
            $(this).parent(".input").each(function() {
               $("label", this).css({
                  "line-height": "60px",
                  "font-size": "24px",
                  "font-weight": "300",
                  "top": "10px"
               })
            });
   
         }
      });
   
      $(".button").click(function(e) {
         var pX = e.pageX,
            pY = e.pageY,
            oX =($(this).offset().left),
            oY =($(this).offset().top);
   
         $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
         $('.x-' + oX + '.y-' + oY + '').animate({
            "width": "500px",
            "height": "500px",
            "top": "-250px",
            "left": "-250px",
   
         }, 600);
         $("button", this).addClass('active');
      })
   
      $(".alt-2").click(function() {
         if (!$(this).hasClass('material-button')) {
            $(".shape").css({
               "width": "100%",
               "height": "100%",
               "transform": "rotate(0deg)"
            })
   
            setTimeout(function() {
               $(".overbox").css({
                  "overflow": "initial"
               })
            }, 600)
   
            $(this).animate({
               "width": "140px",
               "height": "140px"
            }, 500, function() {
               $(".box").removeClass("back");
   
               $(this).removeClass('active')
            });
   
            $(".overbox .title").fadeOut(300);
            $(".overbox .input").fadeOut(300);
            $(".overbox .button").fadeOut(300);
   
            $(".alt-2").addClass('material-buton');
         }
   
      })
   
      $(".material-button").click(function() {
   
         if ($(this).hasClass('material-button')) {
            setTimeout(function() {
               $(".overbox").css({
                  "overflow": "hidden"
               })
               $(".box").addClass("back");
            }, 200)
            $(this).addClass('active').animate({
               "width": "700px",
               "height": "700px"
            });
   
            setTimeout(function() {
               $(".shape").css({
                  "width": "50%",
                  "height": "50%",
                  "transform": "rotate(45deg)"
               })
   
               $(".overbox .title").fadeIn(300);
               $(".overbox .input").fadeIn(300);
               $(".overbox .button").fadeIn(300);
            }, 700)
   
            $(this).removeClass('material-button');
   
         }
   
         if ($(".alt-2").hasClass('material-buton')) {
            $(".alt-2").removeClass('material-buton');
            $(".alt-2").addClass('material-button');
         }
   
      });
   
   });
  }
  onLoginSubmit() {
    this.loading = true;  
    console.log(this.name,this.pass);
    const user = {
      username: this.name,
      password: this.pass
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          if(data.user.role == "admin"){
            this.router.navigate(['admin']);
          }
          else{
          // this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
          // login successful so redirect to return url
           this.router.navigateByUrl(this.returnUrl);
          
                  }
        } else {
           
            // this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
            this.router.navigate(['login']);
         
        }
    });

 }
 onRegisterSubmit() {
   this.successMessage = ' ';
   this.errorMessage = ' '; 
  const user = {
    name: this.regname,
    email: this.email,
    username: this.regusername,
    password: this.regpass,
    role: "user"
  }
  console.log("user's role is "+user.role);
  // Required Fields
  if(!this.validateService.validateRegister(user)) {
    // this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    this.errorMessage = 'Please fill in all fields';
    return false;
  }

  // Validate Email
  if(!this.validateService.validateEmail(user.email)) {
  // this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
  this.errorMessage = 'Please use a valid email';
    return false;
  }

  // Register user
  this.authService.registerUser(user).subscribe(data => {
  if(data.success) {
    // this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
    this.successMessage = 'You are now registered and can now login';
    // this.router.navigate(['/login']);
    
    location.reload();
  } else {
    // this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    this.router.navigate(['/register']);
  }
});
 }
}
