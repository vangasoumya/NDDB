import {Routes} from '@angular/router';
import { GenescomponentComponent } from './genescomponent/genescomponent.component';
import { DiseaseprofileComponent } from './diseaseprofile/diseaseprofile.component';
import { LoginpopupComponent } from './loginpopup/loginpopup.component';
import {AdminComponent} from './admin/admin.component'
import { AuthGuard } from './guards/auth.guard';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

export const appRoutes: Routes = [
    {
        path:'search',
        component: GenescomponentComponent
    },
    {
        path:'diseaseprofile/:genesymbol/:diseasename/:searchelement',
        component: DiseaseprofileComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
         canActivate:[AuthGuard]  //restrict the user from accessing the path

    },
    {
        path: 'login',
        component: LoginpopupComponent

    },
    {
        path: 'forgot',
        component: ForgotPasswordComponent

    },
]
