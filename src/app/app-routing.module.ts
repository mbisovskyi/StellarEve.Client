import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EveAuthenticationPageComponent } from './pages/eve-authentication-page/eve-authentication-page.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { ExternalRedirectResolver } from './resolvers/external-redirect.resolver';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'eve-auth', component: EveAuthenticationPageComponent},

  { path: 'externalRedirect', component: DummyComponent, resolve: { redirect: ExternalRedirectResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
