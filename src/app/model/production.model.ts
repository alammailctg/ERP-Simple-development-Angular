export interface ProductionOrderResponse {
  id: number;
  productionOrderNo: string;
  initialProductionCost: number;
  adjustedProductionCost: number;
  finalProductionCost: number;
  remarks: string;
  initiatorId: number;
  assignedToId: number;
  orderPriorityId: number;
  costTypeId: number;
  productionStartDate: Date;
  productionEndDate: Date;
  lastDateOfUpdate: Date;
  billOfMaterialsId?: number;
  createdDate: Date;
}

export interface ProductionOrderRequest {
  OrderFormRequest: {
    productionOrderNo:string;
    productionStartDate: string;
    productionEndDate: string;
    assignedToId: number;
    initiatorId: number;
    branchId: number;
    orderPriorityId: number;
    initialProductCost: number;
    remarks: string;
  };
  ItemFormRequests: ProductionOrderItemRequest[];
}

export interface ProductionOrderItemRequest {
  productId: number;
  quantityRequested: number;
  unitId:number;
}
