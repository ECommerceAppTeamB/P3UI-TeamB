import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { LocalService } from 'src/app/services/local.service';
import { map } from 'rxjs/operators';

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

export class ProductService {

  private productUrl: string = "/api/product";
  private cartCount = 0;

  private _cart = new BehaviorSubject<Cart>({
    cartCount: this.cartCount,
    products: [],
    totalPrice: 0.00
  });

  private _cart$ = this._cart.asObservable();

  getCart(): Observable<Cart> {
    return this._cart$.pipe(map(cart => cart));
  }

  setCart(cart: { cartCount: number, products: Array<{ product: Product, quantity: number; }>, totalPrice: number; }): void {
    this._cart.next(cart);
    this.localStore.saveData('cart', JSON.stringify(cart));
  }

  setCartCount(count: number): void {
    this.cartCount = count;
    this._cart.next({
      cartCount: this.cartCount,
      products: this._cart.value.products,
      totalPrice: this._cart.value.totalPrice
    });
  }

  getCartCount(): number {
    return this.cartCount;
  }

  getCurrentCart(): Observable<Cart> {
    return this._cart$.pipe(map(cart => cart));
  }

  constructor(private localStore: LocalService, private http: HttpClient) {
    const currentCart = this.localStore.getCurrCart();
    this._cart.next(currentCart);
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + this.productUrl, { headers: environment.headers });
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl + id);
  }

  public purchase(products: { id: number, quantity: number; }[]): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<any>(environment.baseUrl + this.productUrl, payload, { headers: environment.headers });
  }
}
