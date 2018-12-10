import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  title: string;
  imagePreview: string = null;

  constructor(private viewCtrl: ViewController,
              private camera: Camera,
              private _imagePicker: ImagePicker) {
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
                this.imagePreview = "data:image/jpeg;base64," + results[i];
                
                //console.log('Image URI: ' + results[i]);
            }
          }, (err) => { });
    }

  show_camera() {
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

 
     this.camera.getPicture(options).then((imageData) => {
          this.imagePreview = "data:image/jpeg;base64," + imageData;
          console.log(this.imagePreview);
      }).catch(() => {
          console.log("error")}
      );
  }
      

}
