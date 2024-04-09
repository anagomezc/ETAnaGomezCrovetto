import { Component, Input, ViewChild } from '@angular/core';
import { Product } from '../models/product.model';
import { ModalService } from '../services/modal.service';
import {modalAnimation} from '../../assets/modal-animations'
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
  animations: [modalAnimation]

})
export class ModalProductComponent {

  isVisible: boolean = false; 
  quantity: number = 1;

  constructor(public modalService: ModalService, private cartService: CartService) {
    this.isVisible = false;
    this.quantity = 1

  }

  @Input()
  product!: Product;
  
  ngOnInit(): void {

  }

  openModal(): void {
    this.isVisible = true;
    this.quantity = 1

  }

  closeModal(): void {
    this.quantity = 1
    this.modalService.closeModal('productModal');
  }

  incrementQuantity(): void {
    if (this.quantity < 20) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    const carritoIdString = sessionStorage.getItem('carritoId');
    if (carritoIdString) {
      const carritoId = parseInt(carritoIdString, 10);
      this.modalService.closeModal('productModal'); 
      this.cartService.agregarProductoACarrito(carritoId, this.product, this.quantity);
    }
    this.quantity = 1

  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
