import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup = this.fb.group({});

  products: { product: Product, quantity: number; }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  finalProducts: { id: number, quantity: number; }[] = [];

  constructor(private productService: ProductService, public checkoutService: CheckoutService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNum: ['', this.checkoutService.validateCardNum],
      expDate: ['', this.checkoutService.validateExpDate],
      cvv: ['', this.checkoutService.validateCvv],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', this.checkoutService.validateZip],
    });

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



  onSubmit(): void {
    this.products.forEach(
      (element) => {
        const id = element.product.productId;
        const quantity = element.quantity
        this.finalProducts.push({id, quantity})
      } 
    );

    if (this.finalProducts.length > 0) {
      this.productService.purchase(this.finalProducts).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err),
        () => {
          let cart = {
            cartCount: 0,
            products: [],
            totalPrice: 0.00
          };
          this.productService.setCart(cart);
          this.router.navigate(['/home']);
        }
      );

    } else {
      this.router.navigate(['/home']);
    }
  }

}