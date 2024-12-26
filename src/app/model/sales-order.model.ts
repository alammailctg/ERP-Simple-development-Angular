export interface SalesOrder {
    id: number;
    salesOrderNo: string;
    customerName: string;
    orderedDate: string;
    selectedStatusId:number;
    orderItems: OrderItem[];
  }
  
  export interface OrderItem {
    id: number;
    productName: string;
    price: number;
    quantity: string;
    invoiceQuantity: string;
    balanceQuantity: string;
    amount: string;
    unitName: string;
    checked?: boolean;
  }
  
  export interface SalesOrderCriteria {
    pageNumber: number;
    pageSize: number;
  }
  