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
  public areThereMore: boolean = true;

  constructor(private modalCtrl: ModalController,
              private afDB: AngularFireDatabase,
              private platform: Platform,
              public _uploadFileProvider: UploadFileProvider) {
    }

  show_modal() {
      let modal = this.modalCtrl.create(UploadPage)
      modal.present();
  } 

  doInfinite(infiniteScroll) {
    this._uploadFileProvider.load_images().then((areThereMore: boolean) => {
        this.areThereMore = areThereMore;  
        infiniteScroll.complete();
      });
  }


}
