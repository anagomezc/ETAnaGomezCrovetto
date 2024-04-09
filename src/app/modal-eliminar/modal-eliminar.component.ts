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
    //this.cartService.eliminarCarrito(this.carrito.id)
   this.modalService.openModal('deletedCartModal');
    this.cartService.eliminarCarrito(this.carrito.id)
    let userString = sessionStorage.getItem('currentUser');
    if (userString) {
      let user = JSON.parse(userString);
      if (user.vip) {
        console.log('El usuario es VIP.');
        const nuevoCarrito = this.cartService.crearCarrito('vip');
        console.log('Nuevo carrito creado:', nuevoCarrito);
      } else {
        console.log('El usuario no es VIP.');
        const fechaPromocionable = this.cartService.esFechaPromocionable(new Date());
        if (fechaPromocionable) {
          console.log('La fecha es promocionable.');
          const nuevoCarrito = this.cartService.crearCarrito('promocional');
          console.log('Nuevo carrito creado:', nuevoCarrito);
        } else {
          console.log('La fecha no es promocionable.');
          const nuevoCarrito = this.cartService.crearCarrito('comun');
          console.log('Nuevo carrito creado:', nuevoCarrito);
        }
      }
    } else {
      console.log('No se encontró un usuario en sessionStorage.');
    }
    window.location.reload();



  }
  redirectToHome(): void {
    this.modalService.closeModal('deletedCartModal');
    this.router.navigate(['/home']); 
  }

  cancelDelete(): void {
    this.modalService.closeModal('deleteCartModal');
  }
}
