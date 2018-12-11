import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UploadPage } from '../pages/upload/upload';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PipesModule } from '../pipes/pipes.module';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { UploadFileProvider } from '../providers/upload-file/upload-file';

export const firebaseConfig = {
  apiKey: "AIzaSyCUGH0xkNcMLR8HM3LQpRN43-if07m6Vo0",
  authDomain: "gag-b730d.firebaseapp.com",
  databaseURL: "https://gag-b730d.firebaseio.com",
  projectId: "gag-b730d",
  storageBucket: "gag-b730d.appspot.com",
  messagingSenderId: "546394637088"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UploadFileProvider
  ]
})
export class AppModule {}
