import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule, AuthClientConfig, AuthGuard } from '@auth0/auth0-angular';

const config = {
  // Configure your Auth0 Client ID and Client Secret 
  domain: 'id-sandbox.cashtoken.africa/oauth',
  
  clientId: 'wprQYMZBqqx-dgszFUfQG',
  redirectUri: 'http://localhost:3000/callback',
  httpInterceptor: {
    allowedList: ['/api/*']
  },
  // scope: "openid profile email",
};

const routes: Routes = [
  { path: '', redirectTo: '/callback', pathMatch: 'full' },
  // { path: 'callback', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'callback',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent,

    // Protect a route by registering the auth guard in the `canActivate` hook
    canActivate: [AuthGuard],
  },
];

// Provide an initializer function that returns a Promise that fetches from the server config
// function configInitializer(
//   handler: HttpBackend,
//   config: AuthClientConfig
// ) {
//   return () =>
//     new HttpClient(handler)
//       .get('https://id-sandbox.cashtoken.africa/.well-known/openid-configuration')
//       .toPromise()
//       .then((loadedConfig: any) => config.set(loadedConfig));
// }

@NgModule({
  declarations: [
    HomeComponent
  ],
  
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule.forRoot(config),   //<- don't pass any config here
    RouterModule.forRoot(routes),
  ],

  providers: [

    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: configInitializer,    // <- pass your initializer function here
    //   deps: [HttpBackend, AuthClientConfig],
    //   multi: true,
    // },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
