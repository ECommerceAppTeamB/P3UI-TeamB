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

  setOrderNum(orderNum: number) {
    this.saveData('orderNum', JSON.stringify(orderNum));
  }

  getOrderNum(): number {
    return Number(this.getData('orderNum'));
  }

  setTotal(total: number) {
    this.saveData('total', JSON.stringify(total));
  }

  getTotal(): number {
    return Number(this.getData('total'));
  }

  setAddress(address: string) {
    this.saveData('address', address);
  }

  getAddress(): string {
    return this.getData('address')!;
  }

  setCity(city: string) {
    this.saveData('city', city);
  }

  getCity(): string {
    return this.getData('city')!;
  }

  setState(state: string) {
    this.saveData('state', state);
  }

  getState(): string {
    return this.getData('state')!;
  }

  setZip(zip: number) {
    this.saveData('zip', JSON.stringify(zip));
  }

  getZip() {
    return Number(this.getData('zip'));
  }
}
