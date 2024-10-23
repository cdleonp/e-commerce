import { Component, computed, inject, signal } from '@angular/core';
import { ProductComponent } from '@/products/components/product/product.component';
import { Product } from '@/shared/models/product.model'
import { HeaderComponent } from '@/shared/components/header/header.component';
import { CartService } from '@/shared/services/cart.service';
import { ProductService } from '@/shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([]);
  // cartItems = signal<Product[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);

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
    this.productService.getAll()
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
