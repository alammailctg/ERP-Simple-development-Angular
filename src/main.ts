import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'bootstrap';       // Bootstrap JS
import '@popperjs/core';  // Popper.js
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
