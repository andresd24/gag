import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UploadFileProvider {

  constructor(private _toastCtrl: ToastController) {
    console.log('Hello UploadFileProvider Provider');
  }

  load_image_firebase(file: UploadFile) {
      
      let promise = new Promise((resolve, reject) => {
          this.show_toast("loading ...");

          let storeRef = firebase.storage().ref();
          let fileName:string = new Date().valueOf().toString();

          let uploadTask: firebase.storage.UploadTask = 
            storeRef.child(`images/${ fileName}`)
                    .putString(file.image, 'base64', { contentType: 'image/jpeg'});
          
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
              () => {},  // know the percentage of how many MB have been uploaded
              (error) => {
                  console.log("error in loading");
                  console.log(JSON.stringify(error));
                  this.show_toast(JSON.stringify(error));
                  reject(); 
              },
              () => {
                  console.log("file uploaded");
                  this.show_toast("image successfully loaded!")
                  resolve();
              }
            )

      });

      return promise;
  }

 

  show_toast(text: string) {
      let toast = this._toastCtrl.create({
          message: text,
          duration: 2000,
          position: 'top'
      }).present();
  }

}


interface UploadFile {
    title: string;
    image: string;
    key?: string;
}