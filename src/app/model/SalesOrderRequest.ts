
export interface SalesOrderRequest {
    FormRequest: {
      OrderedDate: string;
      CustomerId: number;
      Description: string;
      DeliveryPlane: string;
    };
    OrderItemsRequests: OrderItemRequest[];
  }
  
  export interface OrderItemRequest {
    ProductId: number;
    UnitId: number;
    Quantity: number;
    Price: number;
    DiscountPercent: number;
  }
  
  export interface SalesOrderResponse {
    salesOrder:{
      id:number;
    }
    id:number;
  };
  
  