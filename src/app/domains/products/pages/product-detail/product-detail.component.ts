import { Product } from '@/shared/models/product.model';
import { ProductService } from '@/shared/services/product.service';
import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@/shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {
  @Input() id?: string;
  product = signal<Product | null>(null);
  coverImage = signal('');
  private productservice = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit() {
    if(this.id) {
      this.productservice.getOne(this.id)
      .subscribe({
        next: (product) => {
          // console.log('Product: ', product);
          this.product.set(product);
          if(product.images.length > 0) {
            this.coverImage.set(product.images[0]);
          }
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

  changeCoverImage(newImage: string) {
    this.coverImage.set(newImage);
  }

  addProductToCart() {
    const product = this.product();
    if(product) {
      this.cartService.addProductToCart(product);
    }
  }
}
