import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from '../../models/user';
import { ProductService } from 'src/app/services/product.service';
import { ValidateService } from 'src/app/services/validate.service';
import { LocalService } from 'src/app/services/local.service';
import { OrderConfirmComponent } from 'src/app/components/order-confirm/order-confirm.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [ValidateService, OrderConfirmComponent]
})

export class CheckoutComponent implements OnInit, AfterViewInit {
  checkoutForm: FormGroup = this.fb.group({});
  orderComplete = false;
  currUser!: User;
  products: { product: Product, quantity: number; }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  finalProducts: { id: number, quantity: number, name: string, image: string, description: string, price: number; }[] = [];
  listProducts: { quantity: number, name: string, price: number; }[] = [];
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
    private orderConfirm: OrderConfirmComponent
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

    this.currUser = this.localStore.getCurrUser();
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
      if (cart.products.length > 0) {
        const productsToSend = cart.products.map(product => ({ id: product.product.productId, quantity: product.quantity }));
        console.log(productsToSend);

        this.productService.purchase(productsToSend).subscribe(
          (resp) => {
            console.log(resp);
            this.formValues = {
              address: this.checkoutForm.get('address')!.value,
              city: this.checkoutForm.get('city')!.value,
              state: this.checkoutForm.get('state')!.value,
              zipCode: this.checkoutForm.get('zipCode')!.value,
            };

            for (const value of Object.values(this.formValues)) {
              console.log(value);
            }

            let cart = {
              cartCount: 0,
              products: [],
              totalPrice: 0.00
            };
            this.productService.setCart(cart);
            setTimeout(() => {
              this.router.navigate(['confirmation']);
            }, 1500);
          },
          (err) => alert('Order not submitted')
        );
      } else {
        alert(`Error: Cart is empty`);
      }
    });
  }
}
