import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.displayedColumns = ['title', 'price', 'key'];
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  filter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
  }

  // using this because we want to keep the subscription for the lifetime of the component
  // in case the user has multiple windows open we can those tab reflect changes as needed
  // sometimes we get an observable and unwrap in template
  // sometimes we take 1 on objeservable or specifically unsubscribe in onDestroy
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    
  }

}
