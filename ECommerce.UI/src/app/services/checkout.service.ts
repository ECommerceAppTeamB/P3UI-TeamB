import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

 validateCardNum(c: FormControl) {
  // Check if the card number has a length between 15 and 16 characters
  const isValid = c.value && c.value.toString().length >= 15 && c.value.toString().length <= 16;
  return isValid ? null : { minLength: true };
}

  validateExpDate(c: FormControl): { invalidFormat: boolean; } | null {
    // Check if the value has the correct format (MM/YY), the year is not before 2018, and the month is between 01 and 12
    const isValid = /^\d{2}\/\d{2}$/.test(c.value) && c.value.substring(3) >= '18' && c.value.substring(3) <= '28'  && c.value.substring(0, 2) >= '01' && c.value.substring(0, 2) <= '12';
    return isValid ? null : { invalidFormat: true };
  }

  validateCvv(c: FormControl) {
    const isValid = c.value && c.value.toString().length == 3;
    return isValid ? null : { minLength: true };
  }

  validateZip(c: FormControl) {
    const isValid = c.value && c.value.toString().length >= 5;
    return isValid ? null : { minLength: true };
  }
}
