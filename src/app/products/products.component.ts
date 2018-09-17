import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService, 
    categoryService: CategoryService) { 

    productService.getAll().subscribe(products => {
      this.products = products;

      // cant use snapshot because component is not being destroyed
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
      
    });
    
    this.categories$ = categoryService.getAll();

    
  }


}
