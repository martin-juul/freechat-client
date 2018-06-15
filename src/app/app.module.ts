import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// NG Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import 'reflect-metadata';
import 'zone.js/dist/zone-mix';
import '../polyfills';
import { AppLoadModule } from './app-load/app-load.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';

import { WebviewDirective } from './directives/webview.directive';

import { ElectronService } from './providers/electron.service';
import { TitleService } from './providers/title.service';
import { SharedComponentModule } from './shared/components/shared-component.module';
import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { ParseUrl } from './shared/pipes/parse-url.pipe';
import { LoginService } from './shared/services/login.service';
import { SocketService } from './shared/services/socket.service';
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
    SigninComponent
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
    LoginService,
    TitleService
  ],
  bootstrap: [ AppComponent ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule
{
}
