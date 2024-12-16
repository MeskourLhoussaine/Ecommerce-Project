import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
products:Product[]=[];
currentCategoryId:number | undefined;
  constructor(private productService:ProductService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
   this.listProducts();
  });
  }
  listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      const idParam = this.route.snapshot.paramMap.get('id');
      this.currentCategoryId = idParam ? +idParam : 0;
    } else {
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
        console.log(this.products);
      },
      error => {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    );
  }

}
