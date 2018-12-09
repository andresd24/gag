import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeHolder',
})
export class PlaceHolderPipe implements PipeTransform {

  transform(value: string, default_text: string = "No text") {

//    if (value) {
//        return value;
//    }
//    else {
//        return default_text;
//    }

    return (value) ? value : default_text;
  }
}
