import { Component } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { UploadPage } from '../upload/upload';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: any = [];

  constructor(private modalCtrl: ModalController,
              afDB: AngularFireDatabase,
              private platform: Platform) {
      this.posts =  afDB.list('post').valueChanges();
    }

  show_modal() {
      console.log("show modal");
      let modal = this.modalCtrl.create(UploadPage)
      modal.present();
  }
}
