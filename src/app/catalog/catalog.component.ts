import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, concatMap} from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...this.products];
    });

    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      concatMap(searchTerm => this.apiService.searchProducts(searchTerm))
    ).subscribe(products => {
      this.filteredProducts = products;
    });
  }

  addToBasket(productId: number): void {
    this.apiService.addToBasket(productId).subscribe(response => {
      if (response.success) {
        console.log('Product added to basket');
      } else {
        console.error('Failed to add product to basket');
      }
    });
  }

  /* Not dynamic
  searchProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }*/
  searchProducts(): void {
    this.searchSubject.next(this.searchTerm);
  }
}

