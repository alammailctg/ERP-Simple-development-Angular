import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder } from '../../model/sales-order.model';
import { SignalRService } from '../../services/signal-r.service';
 
@Component({
  selector: 'app-salesorderlist',
  templateUrl: './salesorderlist.component.html',
  styleUrls: ['./salesorderlist.component.css'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SalesorderlistComponent implements OnInit {
    salesOrders: SalesOrder[] = [];
    totalCount: number = 0;
    totalPages: number = 0;
    currentPage: number = 1;
    pageSize: number = 10;
    pages: number[] = [];
    loading: boolean = false;
    loadingTime: string = '';
    checkedAll: boolean = false;
    selectedStatusId: number = 0;
    // Search criteria
    dateFromInput: string = '2000-01-01'; // Default from January 1, 2000
    dateToInput: string = '2030-12-31';   // Default to December 31, 2030
    criteriaName: string = '';
  
    constructor(private salesOrderService: SalesOrderService, private signalRService: SignalRService) { }
    
  ngOnInit(): void {
        this.getSalesOrders(); // Initial load of data
        this.signalRService.startConnection();
        this.signalRService.listenForUpdates(() => {
          this.getSalesOrders(); // Refresh sales order list on update
        });
      }
  toggleAllChecks(): void {
    this.salesOrders.forEach(order =>
      order.orderItems.forEach(item => item.checked = this.checkedAll)
    );
  }
  resetFilters(): void {
    this.dateFromInput = '';
    this.dateToInput = '';
    this.criteriaName = '';
    this.getSalesOrders();
  }
    getSalesOrders() {
      this.loading = true;
      const startTime = new Date();
      const criteria = {
        PageNumber: this.currentPage,
        PageSize: this.pageSize,
        CriteriaName: this.criteriaName,
        DateFrom: this.dateFromInput ? new Date(this.dateFromInput).toISOString().split('T')[0] : '',
        DateTo: this.dateToInput ? new Date(this.dateToInput).toISOString().split('T')[0] : '',
      };
  
      this.salesOrderService.getPendingApprovalSalesOrders(criteria).subscribe({
        next: (response:any) => {
          this.salesOrders = response.salesOrders;
          this.totalCount = response.totalCount;
          this.totalPages = response.totalPages;
          this.pages = this.calculatePages();
          const endTime = new Date();
          this.loadingTime = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);
        },
        error: (error) => {
          console.error('Error fetching sales orders', error);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
    calculatePages(): number[] {
      const maxVisiblePages = 6;
      const startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
      const pages = [];
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      return pages;
    }
    changePage(page: number) {
      if (page !== this.currentPage) {
        this.currentPage = page;
        this.getSalesOrders();
      }
    }
    changeApprovalStatus(): void {
      const selectedOrderItems = this.salesOrders.flatMap(order =>
        order.orderItems
          .filter(item => item.checked)
          .map(item => ({
            StatusId: this.selectedStatusId,
            SalesOrderId: order.id,
            OrderItemId: item.id
          }))
      );
  
      if (selectedOrderItems.length > 0) {
        this.salesOrderService.approveOrderItems(selectedOrderItems).subscribe(() => {
          this.getSalesOrders(); // Refresh data after updating
        });
      }
    }
    onDiscard(salesOrderId: number): void {
      // Create a Bootstrap modal confirmation
      const confirmation = confirm('Are you sure you want to delete this order?');
    
      if (confirmation) {
        this.salesOrderService.deleteSalesOrderById(salesOrderId).subscribe({
          next: (response: string) => {  // Explicitly specify the type of 'response'
            console.log('Order canceled successfully:', response);
            this.getSalesOrders(); 
          },
          error: (error: any) => console.error('Error canceling order:', error) // Explicitly typed 'error'
        });
      } else {
        console.log('Order deletion canceled.');
      }
    }
}
 