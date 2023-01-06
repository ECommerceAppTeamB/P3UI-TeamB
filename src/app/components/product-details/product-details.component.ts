import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})

export class ProductDetailsComponent implements OnInit {

  modalRef?: BsModalRef;

  @Input() productInfo!: Product;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  ngOnInit(): void {
  }
}
