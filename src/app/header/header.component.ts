import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartService } from '../services/cart.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('slideInAnimation', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        }),
        animate('0.3s ease-in-out')
      ]),
      transition('* => void', [
        animate('0.3s ease-in-out', style({
          transform: 'translateX(-100%)',
          opacity: 0
        }))
      ]),
      transition('in => void', [
        animate('0.3s ease-in-out', style({
          transform: 'translateX(-100%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class HeaderComponent {
  isSmallScreen:boolean = false;
  smallScreenBreakpoint:number = 768;
  isMenuOpen: boolean = false;
  carrito: any 

  constructor(private router: Router, private cartService: CartService,private modalService: ModalService){
      if(!modalService.getModalState('productModal')){
        this.carrito = this.cartService.obtenerCarritoDesdeSessionStorage();

      }
    }

  ngOnInit(){
    this.checkScreenSize();
    this.carrito = this.cartService.obtenerCarritoDesdeSessionStorage();

  }
  reload(){
    this.carrito = this.cartService.obtenerCarritoDesdeSessionStorage();

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= this.smallScreenBreakpoint;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  redirectToLogin() {
    this.router.navigate(['/login']); 
  }
  redirectToUser() {
    this.router.navigate(['/user']); 
  }

  redirectToHome() {
    this.router.navigate(['/home']); 
  }
  redirectToCart() {
    this.router.navigate(['/cart']); 
  }
  redirectToAboutUs() {
    this.router.navigate(['/about-us']); 
  }
}
