import { Component } from '@angular/core';
import { CreatesalesorderService } from '../createsalesorder.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductlistComponent } from '../../productlist/productlist.component';
import { GetproductserviceService } from '../../services/getproductservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';
import { CustomerService } from '../../services/customer.service';
import { Unit, UnitService } from '../../services/unit.service';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrderRequest } from '../../model/SalesOrderRequest';
import { map, switchMap } from 'rxjs';
import { environment } from '../../../environment';
@Component({
  selector: 'app-createsalesorder',
  templateUrl: './createsalesorder.component.html',
  styleUrls: ['./createsalesorder.component.css']
})
export class CreatesalesorderComponent {
  orderForm: FormGroup;
  submitted = false; 
  loading = false; 
  constructor(private fb: FormBuilder, 
    private productService:GetproductserviceService, 
    private customerService:CustomerService,
    private unitService:UnitService, 
    private salesOrderService:SalesOrderService)
    {this.orderForm = this.fb.group({
      orderDate: ['', Validators.required],
      customerId: ['', Validators.required],
      deliveryPlane: ['', [Validators.required, Validators.minLength(3)]],
      products: this.fb.array([]) // Initialize FormArray
    });
  }

  ngOnInit(): void {
    if (this.productRows.length === 0) {
      this.addProduct();
    }
    this.fetchProducts();
    this.fetchCustomers();
    this.fetchUnits();
  }

  get productRows(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }
  addProduct() {
    if (this.productRows.invalid) {
      this.productRows.markAllAsTouched(); // Show validation messages for existing rows
      this.submitted=true;
      return; // Prevent adding a new row if any row is invalid
    }

    const productGroup = this.fb.group({
      productId: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      discountPercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unitId: ['', Validators.required]
    });
    this.productRows.push(productGroup);
  }

  removeProduct(index: number) {
    this.productRows.removeAt(index);
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.orderForm.valid) {
      this.loading = true; 
        const formValues = this.orderForm.value;

        const salesOrderRequest: SalesOrderRequest = {
            FormRequest: {
                OrderedDate: new Date(formValues.orderDate).toISOString(),
                CustomerId: formValues.customerId,
                Description: formValues.deliveryPlane,
                DeliveryPlane: formValues.deliveryPlane
            },
            OrderItemsRequests: formValues.products.map((product: any) => ({
                ProductId: product.productId,
                UnitId: product.unitId,
                Quantity: product.quantity,
                Price: product.price,
                DiscountPercent: product.discountPercent
            }))
        };

        this.salesOrderService.createSalesOrder(salesOrderRequest).pipe(
            switchMap((response) => {
                console.log("Sales Order created successfully", response);
                return this.salesOrderService.addSalesOrder().pipe(
                    map(() => response.salesOrder.id)
                );
            })
        ).subscribe({
            next: (salesOrderId) => {
              this.loading = false;
                console.log("Sales Order added successfully");
                window.location.href = `${environment.reportUrl}/GetSalesOrderById?salesOrderId=${salesOrderId}`;
            },
            error: (error: HttpErrorResponse) => {
                console.error('Error creating or adding sales order:', error);
            }
        });
    } else {
        this.orderForm.markAllAsTouched();
    }
}



  units:any[]=[];
  fetchUnits(): void {
    this.unitService.getAllUnits().subscribe({
      next: (response: any) => {
        this.units = Array.isArray(response) ? response : response.units || [];
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }
  

  customers:any[]=[];
  fetchCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (response: any) => {
        this.customers = Array.isArray(response) ? response : response.customers || [];
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }
  selectedCustomerId: number = 0;
  onCustomerChange() {
    this.selectedCustomerId = this.orderForm.get('customerId')?.value;
    console.log('Selected Customer ID:', this.selectedCustomerId);
  }


  products:any[]=[];
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = Array.isArray(response) ? response : response.products || [];
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }
  selectedProductId: number = 0; 
  onProductChange(index: number) {
    const selectedProductId = this.productRows.at(index).get('productId')?.value;
    // Optional: use selectedProductId to fetch or update additional product details in the form.
  }
}
 



 