import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppLoadModule } from './app-load/app-load.module';

import { AppRoutingModule } from './app-routing.module';
// NG Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

import { ElectronService } from './providers/electron.service';
import { ParseUrl } from './shared/pipes/parse-url.pipe';
import { SocketService } from './shared/services/socket.service';

import { WebviewDirective } from './directives/webview.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { SharedComponentModule } from './shared/components/shared-component.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginService } from './shared/services/login.service';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { UserService } from './shared/services/user.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    SettingsComponent,
    SignupComponent,
    SigninComponent,
    ParseUrl
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedComponentModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [ HttpClient ]
      }
    }),
    AppLoadModule,
  ],
  providers: [
    ElectronService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    SocketService,
    AuthService,
    UserService,
    AuthGuard,
    LoginService
  ],
  bootstrap: [ AppComponent ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule
{
}
