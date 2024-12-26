import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../../model/sales-order.model';
import { SalesOrderService } from '../../services/sales-order.service';
import { max } from 'rxjs';

@Component({
  selector: 'app-get-approved-salesorders',
  templateUrl: './get-approved-salesorders.component.html',
  styleUrl: './get-approved-salesorders.component.css'
})
export class GetApprovedSalesordersComponent implements OnInit {

  constructor(private salesOrderService:SalesOrderService)
  {
    
  }
  ngOnInit(): void {
    this.getApprovedSalesOrders();
  }


  salesOrders:SalesOrder[]=[];
  currentPage:number=1;
  totalCount:number=0;
  totalPages:number=0;
  pageSize:number=6;
  dateFrom:string='2000-12-31';
  dateTo:string='2050-12-31';
  criteriaName:string='';
  pages:number[]=[];

 
  getApprovedSalesOrders(){
    const criteria={
      PageNumber:this.currentPage,
      PageSize:this.pageSize,
      DateFrom:this.dateFrom? new Date(this.dateFrom).toISOString().split('T')[0]:'',
      DateTo:this.dateTo? new Date(this.dateTo).toISOString().split('T')[0]:'',
      CriteriaName:this.criteriaName
    }
    this.salesOrderService.getApprovedSalesOrders(criteria).subscribe({
      next:(response:any)=>{
        this.salesOrders=response.salesOrders;
        this.totalCount=response.totalCount;
        this.totalPages=response.totalPages;
        this.pages=this.calculatePages();
      },
      error:(error)=>
      {
        console.log("Error here",error)
      }
    })
  }
calculatePages():number[]{
 const maxVisiblePages=6;
 const startPages=Math.max(1,this.currentPage-Math.floor(maxVisiblePages/2));
 const endPages=Math.min(this.totalPages,startPages+maxVisiblePages-1);
 const pages=[];

 for(let i=startPages;i<=endPages;i++)
 {
  pages.push(i);
 }
 return pages;
}

changePage(page:number){
  if(page!==this.currentPage)
    {
      this.currentPage=page;
      this.getApprovedSalesOrders();
    }
}

}
