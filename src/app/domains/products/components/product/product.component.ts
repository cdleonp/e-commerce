import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@/shared/models/product.model';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '@/shared/pipes/time-ago.pipe';
import { HighlightDirective } from '@/shared/directives/highlight.directive';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, HighlightDirective, RouterLinkWithHref],
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
