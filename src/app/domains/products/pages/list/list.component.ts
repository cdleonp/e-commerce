import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { ProductComponent } from '@/products/components/product/product.component';
import { Product } from '@/shared/models/product.model'
import { HeaderComponent } from '@/shared/components/header/header.component';
import { CartService } from '@/shared/services/cart.service';
import { ProductService } from '@/shared/services/product.service';
import { CategoryService } from '@/shared/services/category.service';
import { Category } from '@/shared/models/category.model';

import { RouterLink } from '@angular/router';
import { HighlightDirective } from '@/shared/directives/highlight.directive';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLink, HighlightDirective],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  @Input() categoryId?: string;
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  // cartItems = signal<Product[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  /* Sin traer datos de una API */
  // constructor() {
  //   const initialProducts: Product[] = [
  //     {
  //       id: Date.now() + Math.floor(Math.random() * 1000),
  //       title: 'Producto 1',
  //       price: 100,
  //       img: 'https://picsum.photos/300/300?r=' + Math.random(),
  //       createdAt: new Date().toISOString(),
  //     },
  //     {
  //       id: Date.now() + Math.floor(Math.random() * 1000),
  //       title: 'Producto 2',
  //       price: 200,
  //       img: 'https://picsum.photos/300/300?r=' + Math.random(),
  //       createdAt: new Date().toISOString(),
  //     },
  //     {
  //       id: Date.now() + Math.floor(Math.random() * 1000),
  //       title: 'Producto 3',
  //       price: 300,
  //       img: 'https://picsum.photos/300/300?r=' + Math.random(),
  //       createdAt: new Date().toISOString(),
  //     },
  //   ]
  //   this.products.set(initialProducts);
  //   // console.log(this.products());
  // }

  addProductToCart(product: Product) {
    // console.log('Estoy en el padre');
    this.cartService.addProductToCart(product);
  }

  ngOnInit() {
    // this.getAllProducts(); Ya no es necesario dado que se ejecuta una vez en el ngOnChanges
    this.getAllCategories();
  }

  ngOnChanges() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAll(this.categoryId)
    .subscribe({
      next: (products) => {
        const finalProducts = products.map((item) => {
          const imgUrlSanitized = item.images.map((url) => {
              return url.replace(/[\[\]\"]/g, '');
          });
          // console.log(imgUrlSanitized);
          return {
              ...item,
              images: imgUrlSanitized
          }
        });
        this.products.set(finalProducts);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getAllCategories() {
    this.categoryService.getAll()
    .subscribe({
      next: (categories) => {        
        this.categories.set(categories);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  /* Sin el servicio */

  // addProductToCart(product: Product) {
  //   // console.log('Estoy en el padre');
  //   this.cartItems.update(prevState => [...prevState, product]);
  // }

  // removeProductFromCart(id: number) {
  //   // console.log('Estoy en el padre');
  //   this.cartItems.update(products => products.filter(product => product.id !== id));
  // }
}
