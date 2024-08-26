import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr'; // Para ngx-toastr
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideAnimations(), // Para suporte a animações, necessário para ambos
    provideToastr() // Para integrar o ngx-toastr

  ]
}).catch((err) => console.error(err));
