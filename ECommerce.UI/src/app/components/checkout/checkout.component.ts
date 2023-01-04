import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from '../../models/user';
import { ProductService } from 'src/app/services/product.service';
import { ValidateService } from 'src/app/services/validate.service';
import { LocalService } from 'src/app/services/local.service';
// import {OrderConfirmation} from 'src/app/components/order-confirmation/order-confirmation.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [ValidateService]
})

export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup = this.fb.group({});
  currUser!: User;
  products: { product: Product, quantity: number; }[] = [];
  totalPrice!: number;
  finalProducts: { id: number, name: string, quantity: number, price: number; }[] = [];

  constructor(private localStore: LocalService,
    private productService: ProductService,
    private validation: ValidateService,
    private router: Router,
    private fb: FormBuilder) { }

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
            const id = element.product.productId;
            const name = element.product.productName;
            const quantity = element.quantity;
            const price = element.product.productPrice;
            this.finalProducts.push({ id, name, quantity, price });
          }
        );
      }
    );
  }

  onSubmit(): void {
    if (this.finalProducts.length > 0) {
      const productsToSend = this.finalProducts.map(product => ({ id: product.id, quantity: product.quantity }));
      this.productService.purchase(productsToSend).subscribe(
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
      alert('Error submitting order.');
    }
  }
}
