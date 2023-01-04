import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ProductService } from 'src/app/services/product.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {
  currUser!: User;
  totalPrice!: number;

  constructor(private localStore: LocalService, private productService: ProductService) {}

  ngOnInit() {
  }

}
