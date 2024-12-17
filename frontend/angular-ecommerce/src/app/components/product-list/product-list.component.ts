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
currentCategoryName: string = "";
searchMode:boolean | undefined;
  constructor(private productService:ProductService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
   this.listProducts();
  });
  }
  
  listProducts() {

  }
handleListProducts(){
  const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
  if (hasCategoryId) {
    // get the "id" param string. convert string to a number using the "+" symbol
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

    // get the "name" param string
    this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
  }        else {
    // not category id available ... default to category id 1
    this.currentCategoryId = 1;
    this.currentCategoryName = 'Books';
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
