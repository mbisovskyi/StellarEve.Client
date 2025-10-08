import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { ExternalRedirectResolver } from './resolvers/external-redirect.resolver';

const routes: Routes = [
  { path: '', component: HomePageComponent},

  { path: 'externalRedirect', component: DummyComponent, resolve: { redirect: ExternalRedirectResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
