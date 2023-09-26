import { HomePageComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfilePageComponent } from './pages/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { PublicComponent } from './pages/public/public.component';

//Create a AuthResolver to redirect user on url '/' when is logged
//The homeComponent must be redirect on app-public or app-private
//..
const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'public',
    component: PublicComponent,
  },
  { path: 'callback', component: CallbackComponent },
  { path: '**', component: NotFoundComponent }, // Redirect to the home page for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
