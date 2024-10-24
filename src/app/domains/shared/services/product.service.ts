import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient = inject(HttpClient);

  constructor() { }

  getAll(categoryId?: string) {
    const url = new URL('https://api.escuelajs.co/api/v1/products');
    if(categoryId) {
      url.searchParams.set('categoryId', categoryId);
    }
    return this.httpClient.get<Product[]>(url.toString());    
  }

  getOne(id: string) {
    return this.httpClient.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);    
  }
  
}
