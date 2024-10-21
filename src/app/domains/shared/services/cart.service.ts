import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Product[]>([]); //Para gestionar el estado del carrito
  totalPrice = computed(() => {
    const cartItems = this.cart();
    return cartItems.reduce((total, product) => total + product.price, 0);
  })

  constructor() { }

  addProductToCart(product: Product) {
    // console.log('Estoy en el padre');
    this.cart.update(prevProducts => [...prevProducts, product]);
  }

  removeProductFromCart(id: number) {
      // console.log('Estoy en el padre');
      this.cart.update(prevProducts => prevProducts.filter(product => product.id !== id));
    }
}
