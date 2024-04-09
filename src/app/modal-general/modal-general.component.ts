import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import {modalAnimation} from '../../assets/modal-animations'

@Component({
  selector: 'app-modal-general',
  templateUrl: './modal-general.component.html',
  styleUrl: './modal-general.component.scss',
  animations: [modalAnimation]
})
export class ModalGeneralComponent {
  isVisible: boolean = false;

  constructor(public modalService: ModalService, private router: Router) {}
 
  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.modalService.closeModal('generalModal');
    this.router.navigate(['/home']); 

  }

  redirectToHome(): void {
    this.closeModal(); 
    this.router.navigate(['/home']); 
  }

  redirectToCart(): void {
    this.closeModal(); 
    this.router.navigate(['/cart']); 
  }
  redirectToUser() {
    this.router.navigate(['/user']); 
  }
}
