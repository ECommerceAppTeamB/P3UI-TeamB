import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

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
    return this._cart$;
  }

  setCart(latestValue: Cart) {
    return this._cart.next(latestValue);
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

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + this.productUrl, { headers: environment.headers, withCredentials: environment.withCredentials });
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl + id);
  }

  public purchase(products: { id: number, quantity: number; }[]): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<any>(environment.baseUrl + this.productUrl, payload, { headers: environment.headers, withCredentials: environment.withCredentials });
  }
}
