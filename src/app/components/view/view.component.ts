import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  imageurl: any;

  constructor(
    private domSanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data?.title);
    console.log(this.data?.author);
    if(this.data?.logo?.data){
      this.viewLogo(this.data?.logo?.data);
    }
  }
  close(){
    this.dialogRef.close();
  }
  viewLogo(data){
      this.imageurl='data:image/JPEG;base64,'+this._arrayBufferToBase64(data);
  }
  _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

}
