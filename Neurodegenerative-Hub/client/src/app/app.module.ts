import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { GenescomponentComponent } from './genescomponent/genescomponent.component';
import { FormsModule } from '@angular/forms';
import { DiseaseprofileComponent } from './diseaseprofile/diseaseprofile.component';
import {appRoutes} from './app.routes';
import { MaterializeModule } from 'ng2-materialize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from "./auth.service";
import { ValidateService } from "./validate.service";
import { AuthGuard } from "./guards/auth.guard";

// import { FlashMessagesModule } from 'angular2-flash-messages/module';
// import { NavbarComponent } from './navbar/navbar.component';
import { LoginpopupComponent } from './loginpopup/loginpopup.component';
import { AdminComponent } from './admin/admin.component';
import { Safe } from './sanitizer.pipe';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'; 



@NgModule({
  declarations: [
    AppComponent,
    GenescomponentComponent,
    DiseaseprofileComponent,
    // NavbarComponent,
    LoginpopupComponent,
    AdminComponent,
    Safe,
    ForgotPasswordComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterializeModule.forRoot(),    
    // FlashMessagesModule.forRoot()
   
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
