import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})

export class OrderConfirmComponent implements OnInit {
  fullName!: string;
  email!: string;
  totalPrice!: number;
  orderNum!: number;
  address!: string;
  city!: string;
  state!: string;
  zipCode!: number;

  constructor(private localStore: LocalService,
    private router: Router) { }

  redirectToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
    const currUser = this.localStore.getCurrUser();
    this.fullName = `${ currUser.firstName } ${ currUser.lastName }`;
    this.email = currUser.email;
    this.orderNum = this.localStore.getOrderNum();
    this.totalPrice = this.localStore.getTotal();
    this.address = this.localStore.getAddress();
    this.city = this.localStore.getCity();
    this.state = this.localStore.getState();
    this.zipCode = this.localStore.getZip();
  }
}
