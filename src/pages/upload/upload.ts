import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { UploadFileProvider } from '../../providers/upload-file/upload-file'

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  title: string;
  imagePreview: string = null;
  image64: string;

  constructor(private viewCtrl: ViewController,
              private camera: Camera,
              private _imagePicker: ImagePicker,
              private _ufp: UploadFileProvider) {
                  this.title = "";
                  this.imagePreview = "";
  }

    close_modal() {
        this.viewCtrl.dismiss();
    }

    select_pictures() {
        const imagePickerOptions: ImagePickerOptions = {
            quality: 70,
            outputType: 1,
            maximumImagesCount: 1
          }
    
        this._imagePicker.getPictures(imagePickerOptions).then((results) => {
            for (var i = 0; i < results.length; i++) {
                this.image64 = results[i];
                this.imagePreview = "data:image/jpeg;base64," + results[i];
            }
          }, (err) => { });
    }


    
      show_camera() {
          const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true
        }
    
     
         this.camera.getPicture(options).then((imageData) => {
              this.image64 = imageData;
              this.imagePreview = "data:image/jpeg;base64," + imageData;
              console.log(this.imagePreview);
          }).catch(() => {
              console.log("error")}
          );
      }
      
    create_post() {
        let file = {
            image: this.image64,
            title: this.title
        };

        console.log(file.title);
        this._ufp.load_image_firebase(file)
            .then(() => {
                console.log("closing modal");
                this.close_modal();
            });
    }

}
