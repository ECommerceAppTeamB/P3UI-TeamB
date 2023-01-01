import { Component, Input } from '@angular/core';

@Component({
  selector: 'ux-tip',
  templateUrl: './uxtip.component.html',
  styles: [],
})

export class UxTipComponent {
  @Input() errorMessage!: string;
  @Input() successMessage!: string;
  @Input() error = false;
  @Input() success = false;

  constructor() { }

  ngOnInit() {
    this.errorMessage;
    this.successMessage;
    this.error = false;
    this.success = false;
  }
}
