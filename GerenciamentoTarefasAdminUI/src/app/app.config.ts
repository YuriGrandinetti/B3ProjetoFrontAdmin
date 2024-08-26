import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Certifique-se de que isso está importado
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { TarefasService } from './services/tarefas.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, HttpClientModule), // Substitua `provideHttpClient()` por `HttpClientModule`
    provideRouter(routes),
    AuthService,
    TarefasService
  ]
};
