import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { SalesorderlistComponent } from './salesorder/salesorderlist/salesorderlist.component';
import { CreatesalesorderComponent } from './salesorder/createsalesorder/createsalesorder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DeleteSalesOrderComponent } from './salesorder/delete-sales-order/delete-sales-order.component';
import { LoginComponent } from './Authentications/login/login.component';
import { AsignrolesComponent } from './asignroles/asignroles.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProductionOrderComponent } from './inventory/create-production-order/create-production-order.component';
import { ProductionOrderListComponent } from './inventory/production-order-list/production-order-list.component';
import { GetAllProductionOrderComponent } from './inventory/get-all-production-order/get-all-production-order.component';
import { SalesReportComponent } from './reportmanager/sales-report/sales-report.component';
import { StimulsoftViewerModule } from 'stimulsoft-viewer-angular';
import { NotificationComponent } from './notification/notification.component';
 

 
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ProductlistComponent,
    CustomerlistComponent,
    SalesorderlistComponent,
    CreatesalesorderComponent,
    DeleteSalesOrderComponent,
    LoginComponent,
    AsignrolesComponent,
    CreateProductionOrderComponent,
    ProductionOrderListComponent,
    GetAllProductionOrderComponent,
    SalesReportComponent,
    NotificationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //angular material list
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    StimulsoftViewerModule  
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],

  providers: [
    provideHttpClient(
      withInterceptorsFromDi() // Use this to set up interceptors if needed
    ),
    provideClientHydration()
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
