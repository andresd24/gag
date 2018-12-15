import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { async } from 'rxjs/internal/scheduler/async';
import { map} from 'rxjs/operators/map';

@Injectable()
export class UploadFileProvider {

  public images:UploadFile[] = [];
  public lastKey:string = null;

  constructor(private _toastCtrl: ToastController,
              private _angularFireDB: AngularFireDatabase) {
      this.load_last_key().subscribe( () => {
          this.load_images();
      });
  }

  private load_last_key() {
    return this._angularFireDB.list('/post', ref =>  ref.orderByKey().limitToLast(1))
          .valueChanges().pipe(
              map((post:any) => {
                  console.log(post);
                  this.lastKey = post[0].key;
    
                  this.images.push( post[0]);
              })
          )
  }

  private load_images() {
      return new Promise ((resolve, reject)=> {
          this._angularFireDB.list('/post', 
            ref => ref.limitToLast(3).orderByKey().endAt(this.lastKey))
            .valueChanges().subscribe( (posts: any) => {
                 posts.pop();
                 
                 if (posts.length == 0) {
                     console.log("no more posts...");
                     resolve(false);
                     return;
                 }

                 this.lastKey = posts[0].key;

                 for (let i = posts.length -1; i >= 0; i--) {
                     let post = posts[i];
                     this.images.push(post);  
                 }

            })
      });

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
              async () => {
                console.log("file uploaded");

                let img = firebase.storage().ref("/images/" + fileName).getDownloadURL();
                let ref= firebase.storage().ref();
                const imgRef = ref.child("/images/" + fileName);
                let url = await imgRef.getDownloadURL();

                console.log("file.title = " + file.title);
                console.log("url = " + url);
                console.log("fileName = " + fileName);
                this.create_post(file.title, url, fileName);
                console.log("finished calling create_post()");
                this.show_toast("image successfully loaded!")

                resolve();
              }

            )

      });

      return promise;
  }

  private create_post(title:string, url: string, fileName: string) {
    let post: UploadFile = {
        image: url,
        title: title,
        key: fileName
    };

    console.log(post.image);
    console.log(post.title);
    console.log(post.key);

    console.log(JSON.stringify(post));    
    this._angularFireDB.object(`/post/${ fileName }`).update(post);
    this.images.push(post);

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