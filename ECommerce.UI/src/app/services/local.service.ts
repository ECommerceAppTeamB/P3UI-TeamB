import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { User } from '../models/user';

interface Cart {
  cartCount: number;
  products: {
    product: Product,
    quantity: number;
  }[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})

export class LocalService {

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public getCurrUser(): User {
    const user = this.getData('currUser')!;
    return JSON.parse(user);
  }

  public getCurrCart(): Cart {
    const cart = this.getData('cart')!;
    return JSON.parse(cart);
  }

}
