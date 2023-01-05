import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { User } from '../../models/user';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit {
  currUser!: User;
  cartCount!: number;
  products: {
    product: Product, //how many of each product is in the cart
    quantity: number; //how many different products are in the cart
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  quantity: number = 0; //the value the user enters in the quantity selection box

  @Input() productInfo!: Product;
  errorMessage: string = '';
  successMessage: string = '';
  error = false;
  success = false;

  constructor(
    private localStore: LocalService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  addToCart(product: Product): void {
    let cartItem: { product: Product, quantity: number; } | undefined;

    if (this.quantity <= 0) {
      this.errorMessage = 'Quantity must be greater than 0';
      this.error = true;
      this.success = false;
      setTimeout(() => {
        this.error = false;
        this.errorMessage = '';
      }, 3000);
      return;
    }

    // Check if the item is already in the cart
    if (cartItem = this.products.find(item => item.product.productId === product.productId)) {
      // Make sure the quantity being added is valid
      if (this.quantity <= cartItem.product.productQuantity - cartItem.quantity && this.quantity > 0) {
        cartItem.quantity += this.quantity;
        this.cartCount += this.quantity;
        this.totalPrice += product.productPrice * this.quantity;
        this.productService.setCart({
          cartCount: this.cartCount,
          products: this.products,
          totalPrice: this.totalPrice
        });
        product.productQuantity -= this.quantity;
        this.error = false;
        this.success = true;
        this.successMessage = 'Added to Cart!';
        setTimeout(() => {
          this.success = false;
          this.successMessage = '';
        }, 3000);
      }
    } else {
      // If the item is not in the cart, add it as a new entry
      if (this.quantity <= product.productQuantity && this.quantity > 0) {
        let newProduct = {
          product: product,
          quantity: this.quantity,
        };
        this.products.push(newProduct);
        this.cartCount += this.quantity;
        this.totalPrice += product.productPrice * this.quantity;
        this.productService.setCart({
          cartCount: this.cartCount,
          products: this.products,
          totalPrice: this.totalPrice
        });
        product.productQuantity -= this.quantity;
        this.error = false;
        this.success = true;
        this.successMessage = 'Added to Cart!';
        setTimeout(() => {
          this.success = false;
          this.successMessage = '';
        }, 3000);
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
