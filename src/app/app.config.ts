import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule }                         from '@angular/platform-browser';
import { provideAnimations }                     from '@angular/platform-browser/animations';
import { provideRouter }                         from '@angular/router';
import { MatTableModule }                        from '@angular/material/table';
import { MatSortModule }                         from '@angular/material/sort';
import { MatIconModule }                         from '@angular/material/icon';
import { MatProgressSpinnerModule }              from '@angular/material/progress-spinner';
import { appRoutes }                             from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      MatTableModule,
      MatSortModule,
      MatIconModule,
      MatProgressSpinnerModule
    ),
    provideAnimations(),
    provideRouter(appRoutes)
  ]
};

