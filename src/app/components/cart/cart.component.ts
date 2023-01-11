import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  items: {
    product: Product,
    quantity: number;
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  disableCheckout = false;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.items = cart.products;
        this.items.forEach(
          (item) => this.cartProducts.push(item.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  emptyCart(): void {
    this.items = [];
    this.totalPrice = 0;
    this.productService.setCart({
      cartCount: 0,
      products: this.items,
      totalPrice: this.totalPrice
    });
  }

  updateQuantity(product: { product: Product, quantity: number; }, quantity: number): void {
    product.quantity = quantity;
    this.recalculateTotalPrice();
  }

  recalculateTotalPrice(): void {
    this.totalPrice = 0;
    this.items.forEach(
      (item) => {
        this.totalPrice += item.product.productPrice * item.quantity;
      }
    );
  }

  updateCart(product: Product, quantity: number): void {
    let item = this.items.find(item => item.product == product);
    item!.quantity = quantity;
    this.updateQuantity(item!, quantity);

    if (quantity == 0) {
      this.items = this.items.filter(item => item.product != product);
    }

    let cartCount = 0;
    this.items.forEach((item) => {
      cartCount += product.quantity;
    });

    this.productService.setCart({
      cartCount: cartCount,
      products: this.items,
      totalPrice: this.totalPrice
    });
  }
}
