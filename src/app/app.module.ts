import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { environment as env } from '../environnements/environnement';

import { AppRoutingModule } from './app-routing.module';

import { FadeInDirective } from './_core/directives/fadeIn.directive';
import { AppComponent } from './app.component';

import { AlertComponent } from './components/alert/alert.component';
import { CallbackComponent } from './components/callback/callback.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeInfoComponent } from './components/home-info/home-info.component';
import { HomeServicesComponent } from './components/home-services/home-services.component';
import { HowtoComponent } from './components/howto/howto.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { HomePageComponent } from './pages/home/home.component';
import { ProfilePageComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,

    //Page
    HomePageComponent,
    ProfilePageComponent,

    //Layout
    PrivateLayoutComponent,

    AlertComponent,
    CallbackComponent,
    FooterComponent,
    HomeInfoComponent,
    HomeServicesComponent,
    HowtoComponent,
    LoaderComponent,
    MenuComponent,
    NotFoundComponent,
    //Directive
    FadeInDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth0,
      httpInterceptor: {
        allowedList: [
          `${env.api.serverUrl}/api/messages/admin`,
          `${env.api.serverUrl}/api/messages/protected`,
          `${env.api.serverUrl}/api/user`,
        ],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
