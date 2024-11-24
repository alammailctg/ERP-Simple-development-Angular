import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-sales-order',
  templateUrl: './delete-sales-order.component.html',
  styleUrl: './delete-sales-order.component.css'
})
export class DeleteSalesOrderComponent implements OnInit {

  salesOrders: any[] = [];
  selectAll: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSalesOrders();
  }

  loadSalesOrders() {
    // Fetch the sales orders from the API (replace with actual API)
    this.http.get<any[]>('/api/sales-orders').subscribe((data) => {
      this.salesOrders = data;
    });
  }

  toggleSelectAll() {
    this.salesOrders.forEach(order => {
      order.selected = this.selectAll;
    });
  }

  deleteSelectedOrders() {
    const selectedOrderIds = this.salesOrders
      .filter(order => order.selected)
      .map(order => order.id);

    if (selectedOrderIds.length > 0) {
      // Call the API to delete the selected orders
      this.http.post('/api/sales-orders/delete', { ids: selectedOrderIds }).subscribe(
        (response) => {
          // Reload the list after deletion
          this.loadSalesOrders();
        },
        (error) => {
          console.error('Error deleting orders', error);
        }
      );
    } else {
      alert('No orders selected');
    }
  }
}
