import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { CartService } from '@/shared/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // @Input({ required: true }) cartItems: Product[] = [];
  private cartService = inject(CartService);

  hideCartMenu = signal(true);
  cart = this.cartService.cart;
  totalPrice = this.cartService.totalPrice;

  toggleCartMenu() {
    this.hideCartMenu.update(prevState => !prevState);
  }

  removeProductFromCart(id: number) {
    // console.log('Estoy en el padre');
    this.cartService.removeProductFromCart(id);
  }

  /* Sin el servicio */

  // calcTotalPrice() {
  //   return this.cartItems.reduce((total, product) => total + product.price, 0);
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('ngOnChanges');
  //   console.log('-'.repeat(10));
  //   console.log(changes);
  //   if(changes.hasOwnProperty('cartItems')) {
  //     this.totalPrice.set(this.calcTotalPrice());
  //   }
  // }

  // removeProductFromCart(id: number) {
  //   const carItemsFiltered = this.cartItems.filter(product => product.id !== id);
  //   this.cartItems = carItemsFiltered;
  //   console.log(this.cartItems);
  // }
}
