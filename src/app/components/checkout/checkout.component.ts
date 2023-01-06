import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ValidateService } from 'src/app/services/validate.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [ValidateService]
})

export class CheckoutComponent implements OnInit, AfterViewInit {
  checkoutForm: FormGroup = this.fb.group({});
  totalPrice!: number;
  products: { product: Product, quantity: number; }[] = [];
  cartProducts: Product[] = [];
  finalProducts!: { id: number, quantity: number; }[];
  listProducts: { quantity: number, name: string, price: number; }[] = [];
  orderComplete = false;
  orderNum = Math.floor(Math.random() * 100000000) + 10000000;
  formValues!: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };

  constructor(
    private localStore: LocalService,
    private productService: ProductService,
    private validation: ValidateService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNum: ['', this.validation.validateCardNum],
      expDate: ['', this.validation.validateExpDate],
      cvv: ['', this.validation.validateCvv],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', this.validation.validateZip],
    });

    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;

        this.products.forEach(
          (element) => {
            this.cartProducts.push(element.product);
          }
        );
        this.totalPrice = cart.totalPrice;
        this.listProducts = this.cartProducts.map(product => ({ quantity: product.quantity, name: product.productName, price: product.productPrice }));
      }
    );
  }

  ngAfterViewInit(): void {
    this.formValues = {
      address: '',
      city: '',
      state: '',
      zipCode: ''
    };
  }

  onSubmit(): void {
    this.productService.getCart().subscribe(cart => {
      this.finalProducts = cart.products.map(product => ({ id: product.product.productId, quantity: product.quantity }));
    });

    this.productService.purchase(this.finalProducts).subscribe(
      (resp) => {
        this.setDetails();
      },
      (err) => alert('Order not submitted')
    );
  }

  setDetails() {
    // Get the values from the form
    const address = this.checkoutForm.get('address')!.value;
    const city = this.checkoutForm.get('city')!.value;
    const state = this.checkoutForm.get('state')!.value;
    const zipCode = this.checkoutForm.get('zipCode')!.value;

    // Set the values in the localService class
    this.localStore.setOrderNum(this.orderNum);
    this.localStore.setTotal(this.totalPrice);

    // Navigate to the OrderConfirm component
    this.router.navigate(['confirmation']);
    let cart = { cartCount: 0, products: [], totalPrice: 0.00 };
    this.productService.setCart(cart);
  }

}
