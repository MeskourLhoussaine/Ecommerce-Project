
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1; // Default to 1
  previousCategoryId: number=1;
  currentCategoryName: string = 'Books'; // Default category name
  searchMode: boolean = false;

  //new properties for pagination 
  thePageNumber:number=1;
  thepageSize:number=5;
  theTotalElements:number=0;
  previousKeyword:any;
  //cartService: any;


  constructor(private productService: ProductService, private cartService:CartService, private route: ActivatedRoute) {}

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
    const theKeyword: any = this.route.snapshot.paramMap.get('keyword');
    if(this.previousKeyword!=theKeyword){
      this.thePageNumber=1;
    }
    this.previousKeyword=theKeyword;
 console.log(`keyword=${theKeyword},thePageNumber= ${this.thePageNumber}`);

   
      this.productService.searchProductsPaginate(this.thePageNumber,
                                                this.thepageSize,
                                                theKeyword).subscribe(this.processResult());
      
    
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

    //Check if we have a different category than previous
    //Note:Angular will reuse a component if it is currently viewd
    //

    // if we have a different category id than previous
    //then set thePageNumber bach to 1
    if(this.previousCategoryId!=this.currentCategoryId){
      this.thePageNumber=1
    }
       

    
    this.previousCategoryId=this.currentCategoryId;
    console.log(`currrentCategoryId=${this.currentCategoryId},thePageNumber`);
    // Fetch products for the selected category
    this.productService.getProductListPaginate(this.thePageNumber-1,
                                               this.thepageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult() );
    
  }
  updatePageSize(pageSize:string){
this.thepageSize=+pageSize;
this.thePageNumber =1;
this.listProducts();

  }
addToCart(theProduct:Product){
  console.log(`Adding to cart:${theProduct.name},${theProduct.unitPrice}`);
  const theCartItem=new CartItem(theProduct);
  this.cartService.addToCart(theCartItem);
}

  processResult(){
    return(data:any)=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thepageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    }
  }
}
