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
  products: {
    product: Product,
    quantity: number;
  }[] = [];
  totalPrice!: number;

  cartProducts: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  emptyCart(): void {
    this.products = [];
    this.totalPrice = 0;
    this.productService.setCart({
      cartCount: 0,
      products: this.products,
      totalPrice: this.totalPrice
    });
  }

  updateQuantity(product: { product: Product, quantity: number; }, quantity: number): void {
    product.quantity = quantity;
    this.recalculateTotalPrice();
  }

  recalculateTotalPrice(): void {
    this.totalPrice = 0;
    this.products.forEach(
      (product) => {
        this.totalPrice += product.product.productPrice * product.quantity;
      }
    );
  }

  updateCart(product: Product, quantity: number): void {
    let item = this.products.find(element => element.product == product);
    item!.quantity = quantity;
    this.updateQuantity(item!, quantity);

    if (quantity == 0) {
      this.products = this.products.filter(element => element.product != product);
    }

    let cartCount = 0;
    this.products.forEach((product) => {
      cartCount += product.quantity;
    });

    this.productService.setCart({
      cartCount: cartCount,
      products: this.products,
      totalPrice: this.totalPrice
    });
  }
}
