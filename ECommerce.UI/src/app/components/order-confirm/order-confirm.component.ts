import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {
  @Input() currUser!: User;
  @Input() totalPrice!: number;
  @Input() formValues!: {
    cardName: string;
    cardNum: string;
    expDate: string;
    cvv: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };

  constructor(private router: Router) { }

  redirectToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
