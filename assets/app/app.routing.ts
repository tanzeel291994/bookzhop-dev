import { AuthGuardService } from './auth/auth.guard.service';
import { BookListComponent } from './book/book-list.component';
import { LoginComponent } from './auth/login.component';
import { Routes, RouterModule } from "@angular/router";




const APP_ROUTES: Routes = [
    { path: '', component: BookListComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
//    { path: 'messages', component: MessagesComponent },
  //  { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);