import { Component } from '@angular/core';
import { UserService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user: User | null
  cronologia: any[] = ['Junio']
  comprasRegistradas: any[] = [];
  visibilidadCompras: { [key: string]: boolean } = {};
  selectedFechaCompra: string | null = null; 
  isSmallScreen:boolean = false;
  smallScreenBreakpoint:number = 768;

  constructor(private userService: UserService ){
    const userString = sessionStorage.getItem('currentUser');
    this.user = userString ? JSON.parse(userString) : null;
    console.log("this.", this.user)
    const storedData = localStorage.getItem('comprasRegistradas');
    if (storedData) {
      const comprasRegistradas = JSON.parse(storedData);
      this.comprasRegistradas = comprasRegistradas
    }
    console.log("Compras registradas", this.comprasRegistradas)

   }
  toggleVisibilidadCompra(fechaCompra: string): void {
    if (this.selectedFechaCompra === fechaCompra) {
      this.selectedFechaCompra = null; 
    } else {
      this.selectedFechaCompra = fechaCompra; 
    }
    this.visibilidadCompras[fechaCompra] = !this.visibilidadCompras[fechaCompra];
  }
  isSelected(fechaCompra: string): boolean {
    return this.selectedFechaCompra === fechaCompra;
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= this.smallScreenBreakpoint;
  }

  ngOnInit(){
    for (let i = 1; i < 13; i++) {
      if(this.user){ 
      const usuario = this.userService.didBecomeVipInMonth(this.user, i, 2024)
      if(usuario){
        const meses = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
      
        if (i >= 1 && i <= 12) {
          this.cronologia.push(meses[i-1])        
        } 
        
      }
      }
      
    }
    console.log("crono", this.cronologia)
    this.checkScreenSize();

    /* if(this.user){
      console.log("usuario", this.user)
      console.log("Users vip abril", this.userService.didBecomeVipInMonth(this.user, 4, 2024))

    } */
  }

}
