import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from "./app.routing";
import { AppComponent } from "./app.component";
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book/book-list.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookInputComponent } from './book/book-input.component';
import { LoginComponent } from './auth/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth.guard.service';

@NgModule({
    declarations: [
        AppComponent,BookComponent,BookListComponent,BookInputComponent,LoginComponent
    ],
    imports: [ BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule],
    providers: [AuthService,AuthGuardService],
    bootstrap: [AppComponent],
})
export class AppModule {

}