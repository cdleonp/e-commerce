import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { Product } from '@/shared/models/product.model';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '@/shared/pipes/time-ago.pipe';
import { HighlightDirective } from '@/shared/directives/highlight.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, HighlightDirective],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToCart = new EventEmitter<Product>();

  addToCartHandler() {
    // console.log('Click desde el hijo');
    this.addToCart.emit(this.product);
  }
}
