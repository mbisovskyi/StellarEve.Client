import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EveAuthenticationPageComponent } from './pages/eve-authentication-page/eve-authentication-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DummyComponent } from './components/dummy/dummy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EveAuthenticationPageComponent,
    NavbarComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
