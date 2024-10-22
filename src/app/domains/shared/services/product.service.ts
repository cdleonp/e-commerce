import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '@/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient = inject(HttpClient);
  products = signal<Product[]>([]);

  constructor() { }

  getProducts() {
    return this.httpClient.get<Product[]>('https://api.escuelajs.co/api/v1/products');    
  }
  
}
