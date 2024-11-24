import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { GetproductserviceService } from '../services/getproductservice.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'] // Ensure 'styleUrls' is correct
})
export class ProductlistComponent implements OnInit{
  
  products: Product[] = []; // Use the Product model instead of 'any'

  constructor(private getProductServices: GetproductserviceService) { }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.getProductServices.getAllProducts().subscribe({
      next: (response: any) => {
        console.log(response); // Log the response
        this.products = response.products; // If the response is directly an array
        // Or adjust this based on the actual response structure
        // this.products = response.data; // Uncomment if using a nested structure
      },
      error: (error) => {
        console.error('Error fetching products', error);
      },
      complete: () => {
        console.log('Product fetch complete');
      }
    });
  }
  
}
