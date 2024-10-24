import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private httpClient = inject(HttpClient);

  constructor() { }

  getAll() {
    return this.httpClient.get<Category[]>('https://api.escuelajs.co/api/v1/categories');
  }
}
