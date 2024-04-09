import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { modalAnimation } from '../../assets/modal-animations';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrl: './modal-eliminar.component.scss',
  animations: [modalAnimation]

})
export class ModalEliminarComponent {
  carrito: any

  constructor(public modalService: ModalService, private cartService: CartService, private router: Router) {
    this.carrito = this.cartService.obtenerCarritoDesdeSessionStorage();
  }

  confirmDelete(): void {
   this.modalService.openModal('deletedCartModal');
    this.cartService.eliminarCarrito(this.carrito.id)
    let userString = sessionStorage.getItem('currentUser');
    if (userString) {
      let user = JSON.parse(userString);
      if (user.vip) {
        const nuevoCarrito = this.cartService.crearCarrito('vip');
      } else {
        const fechaPromocionable = this.cartService.esFechaPromocionable(new Date());
        if (fechaPromocionable) {
          const nuevoCarrito = this.cartService.crearCarrito('promocional');
        } else {
          const nuevoCarrito = this.cartService.crearCarrito('comun');
        }
      }
    } else {
    }


  }
  redirectToHome(): void {
    this.modalService.closeModal('deletedCartModal');
    this.router.navigate(['/home']); 
  }

  cancelDelete(): void {
    this.modalService.closeModal('deleteCartModal');
  }
  redirectToUser(): void {
    this.modalService.closeModal('deletedCartModal');
    this.router.navigate(['/user']); 
  }
}
