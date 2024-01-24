import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthGuard } from './auth-guard.service';


const routes: Routes = [
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard] },
];


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppModule { }
export class AppRoutingModule { }
