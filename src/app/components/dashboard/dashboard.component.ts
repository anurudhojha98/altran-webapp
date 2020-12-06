import { Component, OnInit, ViewChild } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
import { ViewComponent } from '../view/view.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  total:number=0;
  page:number=0;
  pageSize:number=10;
  pageSizeOptions:any=[10,20,50,100];
  searchText:any;
  displayedColumns: string[] = ['title', 'description', 'author','price','action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  params:any={};
  constructor(
    private dialog:MatDialog,
    private reqService:RequestService,
    private common:CommonService
  ){

  }
   ngOnInit(){
     this.getBookList();
   }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }
  sortData(event){
    this.params['sortKey']=event.active;
    this.params['sortOrder']=event.direction;
    this.getBookList();
  }
  loadPage(event){
    this.page=event.pageIndex;
    this.pageSize=event.pageSize;
    this.getBookList();
  }
  addBook(data){
    const dialogConsentRef = this.dialog.open(BookComponent, {
      width: '500px',
      data: {data}
    });
    dialogConsentRef.afterClosed().subscribe(result => {
      this.getBookList();
    
    });
  }
  getBookList(){
    this.params['page']=this.page;
    this.params['pageSize']=this.pageSize;
    this.common.showLoader();
    this.reqService.getBookList(this.params).subscribe((res:any)=>{
      console.log(res);
      this.total=res.total;
      this.dataSource=res.data;
      this.common.hideLoader();
    },
      (err)=>{
      this.common.hideLoader();
      console.error(err);
    });
  }
  onInputChange(char):void{
       this.params['searchText']=char;
       this.getBookList();
  }
  viewData(data){
    const dialogConsentRef = this.dialog.open(ViewComponent, {
      width: '400px',
      data: data
    });
    dialogConsentRef.afterClosed().subscribe(result => {
      // this.getBookList();
    });
  }
}
