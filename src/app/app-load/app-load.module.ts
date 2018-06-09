import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppLoadService } from './app-load.service';

export function getUser(appLoadService: AppLoadService) {
  return () => appLoadService.getUser();
}

@NgModule({
  imports: [ HttpClientModule ],
  providers: [
    AppLoadService,
    {
      provide: APP_INITIALIZER,
      useFactory: getUser,
      deps: [ AppLoadService ],
      multi: true
    }
  ]
})
export class AppLoadModule
{
}
