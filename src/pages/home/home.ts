import { Component } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { UploadPage } from '../upload/upload';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { UploadFileProvider } from '../../providers/upload-file/upload-file';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: any = [];

  constructor(private modalCtrl: ModalController,
              private afDB: AngularFireDatabase,
              private platform: Platform,
              private _uploadFileProvider: UploadFileProvider) {
        //this.posts =  afDB.list('post').valueChanges();
    }

  show_modal() {
      console.log("show modal");
      let modal = this.modalCtrl.create(UploadPage)
      modal.present();
  } 

  /*
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this._uploadFileProvider.load_images()
      .then(() => { infiniteScroll.complete();});
  }
  */

}
