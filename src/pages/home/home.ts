import { Component } from '@angular/core';
import { ModalController, Platform, ToastController, NavController } from 'ionic-angular';
import { UploadPage } from '../upload/upload';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { UploadFileProvider } from '../../providers/upload-file/upload-file';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: any = [];
  public areThereMore: boolean = true;

  constructor(private modalCtrl: ModalController,
              private navCtrl: NavController,
              private afDB: AngularFireDatabase,
              private platform: Platform,
              public _uploadFileProvider: UploadFileProvider,
              private _socialSharing: SocialSharing,
              private _toastCtrl: ToastController) {
    }

  show_modal() {
      let modal = this.modalCtrl.create(UploadPage)
      modal.present();
  } 

  doInfinite(infiniteScroll) {
    this._uploadFileProvider.load_images().then((areThereMore: boolean) => {
        this.areThereMore = areThereMore;  
        console.log(this.areThereMore);
        infiniteScroll.complete();
      });
  }

  share_post(post:any) {
      console.log("sharing post");
      console.log(post.image);
      this._socialSharing.shareViaFacebook(post.title, null, post.image)
        .then( ()=> {
            if (this.platform.is("android")) {
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
            }
          })
        .catch( (err)=> {})
        
  }

  show_toast(text: string) {
    let toast = this._toastCtrl.create({
        message: text,
        duration: 2000,
        position: 'top'
    }).present();
}


}
