import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { CreatesalesorderComponent } from './salesorder/createsalesorder/createsalesorder.component';
import { LoginComponent } from './Authentications/login/login.component';
import { AsignrolesComponent } from './asignroles/asignroles.component';
import { SalesorderlistComponent } from './salesorder/salesorderlist/salesorderlist.component';
import { ProductionOrderService } from './services/production-order.service';
import { CreateProductionOrderComponent } from './inventory/create-production-order/create-production-order.component';
import { ProductionOrderListComponent } from './inventory/production-order-list/production-order-list.component';
import { SalesReportComponent } from './reportmanager/sales-report/sales-report.component';
import { NotificationComponent } from './notification/notification.component';
import { LicenseManagementComponent } from './license-management/license-management.component';
import { PracticeComponent } from './practice/practice.component';
import { GetApprovedSalesordersComponent } from './salesorder/get-approved-salesorders/get-approved-salesorders.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  
  {
    path: 'practice',
    component: PracticeComponent
  },

  {
    path: 'practice2',
    component: PracticeComponent
  },


  {
    path: 'license',
    component: LicenseManagementComponent
  },

  {
    path: 'sales-report',
    component: SalesReportComponent
  },

  {
    path: 'notification',
    component: NotificationComponent
  },


  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'product-list',
        component: ProductlistComponent
      },
      {
        path: 'customer-list',
        component: CustomerlistComponent
      },
      {
        path: 'create-production-order',
        component:CreateProductionOrderComponent
      },
      {
        path: 'get-production-order',
        component:ProductionOrderListComponent
      },
      {
        path: 'get-approved-salesorder',
        component: GetApprovedSalesordersComponent
      },
    
      {
        path: 'sales-order-list',
        component: SalesorderlistComponent
      },

      {
        path: 'create-sales-order',
        component: CreatesalesorderComponent
      },
      {
        path:'assign-role', component:AsignrolesComponent
     }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
