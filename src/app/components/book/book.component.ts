import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { FileInput } from 'ngx-material-file-input';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  matcher:ErrorStateMatcher;
  bookForm:FormGroup;
  isUpdate: any=false;
  constructor(
    private reqService:RequestService,
    private common:CommonService,
    public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.bookForm=new FormGroup({
      title : new FormControl('', [
        Validators.required
      ]),
      author : new FormControl('', [
        Validators.required
      ]),
      description : new FormControl('', [
        Validators.required
      ]),
      price : new FormControl('', [
        Validators.required
      ]),
      logo : new FormControl('', []),
    });
    this.matcher = new MyErrorStateMatcher();
  }

  onSubmit():void{
    if(this.bookForm.valid){
      console.log(this.bookForm.value)
      const file_form: FileInput = this.bookForm.get('logo').value;
      const file = file_form.files[0]; // in case user didn't selected multiple files
      const formData = new FormData();
      formData.append('logo', file);
      formData.append('title',this.bookForm.value.title)
      formData.append('author',this.bookForm.value.author)
      formData.append('description',this.bookForm.value.description)
      formData.append('price',this.bookForm.value.price)
       this.common.showLoader();
        this.reqService.addBook(formData).subscribe((res:any)=>{
          this.common.hideLoader();
        },(err)=>{
          this.common.hideLoader();
          console.error(err)
        })
    }
  }

  close(){
    this.dialogRef.close();
  }
}
