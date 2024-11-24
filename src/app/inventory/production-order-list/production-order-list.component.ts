import { Component } from '@angular/core';

interface ProductionOrder {
  date: string;
  docType: string;
  docNo: string;
  priority: string;
  reqDate: string;
  shedDate: string;
  expDate: string;
  unitGroup: string;
  customer: string;
  docStatus: string;
  remarks: string;
}
@Component({
  selector: 'app-production-order-list',
  templateUrl: './production-order-list.component.html',
  styleUrl: './production-order-list.component.css'
})
export class ProductionOrderListComponent {
  productionOrders: ProductionOrder[] = [
    { date: '08-Jun-17', docType: 'PA', docNo: 'PA1706000001', priority: 'High', reqDate: '08-Jun-17', shedDate: '08-Jun-17', expDate: '14-Jul-17', unitGroup: 'Unit1', customer: 'A-ONE TRADING CO.', docStatus: 'Pending', remarks: '' },
    { date: '20-Apr-17', docType: 'PA', docNo: 'PA170400016', priority: 'High', reqDate: '20-Apr-17', shedDate: '20-Apr-17', expDate: '20-Apr-17', unitGroup: 'Unit1', customer: 'A-ONE TRADING CO.', docStatus: 'Posted', remarks: '' },
    // Add additional data as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}
