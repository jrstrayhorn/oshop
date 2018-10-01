import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService, 
    private shoppingCartService: ShoppingCartService
    ) { 
    
    

    productService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return route.queryParamMap;
        })
      )
    .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
  }

  // using ngOnInit because we need to call async method
  // and cant call async method in a constructor so use ngOnInit
  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
