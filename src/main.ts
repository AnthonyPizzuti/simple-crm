import { bootstrapApplication } from '@angular/platform-browser';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

const firebaseConfig = {
  apiKey: 'AIzaSyDatofBd6CbqWc7Bh4w0a6SBNC9Dph4Bhk',
  authDomain: 'simple-crm-38867.firebaseapp.com',
  projectId: 'simple-crm-38867',
  storageBucket: 'simple-crm-38867.firebasestorage.app',
  messagingSenderId: '681864707436',
  appId: '1:681864707436:web:9cadd0f5f6b1ba1137c749',
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideNativeDateAdapter(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
});
