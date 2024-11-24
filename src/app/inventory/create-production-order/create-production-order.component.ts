import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductionOrderService } from '../../services/production-order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GetproductserviceService } from '../../services/getproductservice.service';
import { ProductionOrderRequest } from '../../model/production.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-production-order',
  templateUrl: './create-production-order.component.html',
  styleUrls: ['./create-production-order.component.css']
})
export class CreateProductionOrderComponent implements OnInit {
  orderForm: FormGroup;
  submitted = false; 
  loading = false; 
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productionOrderService: ProductionOrderService,
    private productService: GetproductserviceService
  ) {
    this.orderForm = this.fb.group({
      productionOrderNo: [null, Validators.required],
      productionStartDate: [null, Validators.required], 
      productionEndDate: [null, Validators.required],
      assignedToId: [null, Validators.required],
      initiatorId: [null, Validators.required],
      orderPriorityId: [null, Validators.required],
      branchId: [null, Validators.required],
      initialProductionCost: [null, Validators.required],
      remarks: ['', Validators.required],
     
      products: this.fb.array([]) // FormArray for products
    });
  }

  ngOnInit(): void {
    this.addProduct();
    this.generate();
    this.fetchProducts();
  }

  get productRows(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  addProduct(): void {
    if (this.productRows.invalid) {
      this.productRows.markAllAsTouched();
      this.submitted = true;
      return; // Prevent adding if any row is invalid
    }

    const productGroup = this.fb.group({
      productId: ['', Validators.required],
      quantityRequested: [0, Validators.required],
      unitId:[null, Validators.required],
    });

    this.productRows.push(productGroup);
  }

  deleteProductionDetail(index: number): void {
    if (this.productRows.length > 1) {
      this.productRows.removeAt(index);
    } else {
      alert("At least one product row is required.");
    }
  }

  onSubmit() {
    this.submitted = true;
    const formValues = this.orderForm.value;
  
    if (this.orderForm.valid) {
      this.loading = true;
      const productionOrderRequest: ProductionOrderRequest = {
        OrderFormRequest: {
          productionOrderNo: formValues.productionOrderNo,
          productionStartDate: new Date(formValues.productionStartDate).toISOString(), 
          productionEndDate: new Date(formValues.productionEndDate).toISOString(), 
          assignedToId: formValues.assignedToId,
          initiatorId: formValues.initiatorId,
          branchId: formValues.branchId,
          orderPriorityId: formValues.orderPriorityId,
          initialProductCost: formValues.initialProductionCost,
          remarks: formValues.remarks,
        },
        ItemFormRequests: formValues.products.map((product: any) => ({
          productId: product.productId,  
          quantityRequested: product.quantityRequested,  
          unitId: product.unitId,
          remarks: formValues.remarks

        }))
      };
  
      console.log('Sending Production Order Request:', productionOrderRequest);
  
      this.productionOrderService.createProductionOrder(productionOrderRequest).subscribe({
        next: (response) => {
          this.loading = false;
          alert("Production Order created successfully");
          this.orderForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          console.error('Error:', error.message);
          alert("Error creating production order. Please check the input and try again.");
        }
      });
    } else {
      this.orderForm.markAllAsTouched();
      Object.keys(this.orderForm.controls).forEach(key => {
        const controlErrors = this.orderForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`${key} errors:`, controlErrors);  // Corrected template string
        }
      });
  
      this.productRows.controls.forEach((productControl, index) => {
        console.log(`Product row ${index} valid:`, productControl.valid);
      });
    }
  }

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
 
  generate(): void {
    const productionOrderNo = 'PO-' + new Date().getTime();
    const productionOrderNoControl = this.orderForm.get('productionOrderNo');
  
    if (productionOrderNoControl) {
      productionOrderNoControl.setValue(productionOrderNo);
    } else {
      console.error('Production order number control is not found in the form.');
    }
  }
}
