import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  // img = 'https://picsum.photos/300/300?r=' + Math.random();
  @Input({ required: true }) img: string = '';
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) price: number = 0;

  @Output() addToCart = new EventEmitter<string>();

  addToCartHandler() {
    console.log('Click desde el hijo');
    this.addToCart.emit('Mensaje emitido desde el hijo: ' + this.title);
  }
}
