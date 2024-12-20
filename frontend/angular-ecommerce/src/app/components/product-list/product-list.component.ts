import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1; // Default to 1
  currentCategoryName: string = 'Books'; // Default category name
  searchMode: boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to route parameters to update product list dynamically
    this.route.paramMap.subscribe(() => {
      this.listProducts();
      
    });
  }

  listProducts(): void {
    // Check if the route contains a 'keyword' parameter for search mode
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts(): void {
    const theKeyword: string | null = this.route.snapshot.paramMap.get('keyword');
    if (theKeyword) {
      this.productService.searchProducts(theKeyword).subscribe(
        data => {
          if (data.length === 0) {
            console.log('No products found');
          } else {
            this.products = data;
          }
        },
        error => {
          console.error('Error fetching search results:', error);
        }
      );
    }
  }
  

  handleListProducts(): void {
    // Check if the route contains an 'id' parameter for category filtering
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name') || 'Category';
    } else {
      // Default to category id 1 if no category id is provided
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    // Fetch products for the selected category
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
        console.log('Fetched products:', this.products);
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
