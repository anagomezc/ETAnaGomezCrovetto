import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    { id:1, username: 'Juan', password: 'Juan', cart: [], purchaseHistory: [], vip: true, fechaVip: new Date()  },
    { id:2, username: 'Lucia', password: 'Lucia', cart: [], purchaseHistory: [], vip: false },
    { id:3, username: 'Tomas', password: 'Tomas', cart: [], purchaseHistory: [], vip: false },

  ];

  constructor() { }

  login(username: string, password: string): User | undefined {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return undefined
  }

  getUsers(): User[] {
    return this.users;
  }

  addToCart(user: User, item: any): void {
    user.cart.push(item);
  }

  purchase(user: User): void {
    user.purchaseHistory.push(user.cart);
    user.cart = [];
  }

  getPurchaseHistory(user: User): any[] {
    return user.purchaseHistory;
  }

  getVipClients(): User[] {
    return this.users.filter(user => user.vip);
  }

  didBecomeVipInMonth(user: User, month: number, year: number): boolean {
    const totalPurchases = this.getTotalPurchasesInMonth(user, month, year);
    return totalPurchases > 10000 && !user.vip;
  }

  private getTotalPurchasesInMonth(user: User, month: number, year: number): number {
    let totalPurchases = 0;
    const storedData = localStorage.getItem('comprasRegistradas');
  
    if (storedData) {
      const comprasRegistradas = JSON.parse(storedData);
  
      const filteredPurchases = comprasRegistradas.filter((purchase: any) => {
        const fechaCompra = new Date(purchase.fechaCompra);
        return this.isSameMonth(fechaCompra, month, year);
      });
  
      totalPurchases = filteredPurchases.reduce((total: number, purchase: any) => {
        return total + this.calculateCartTotal(purchase.productos);
      }, 0);
    }
  
    return totalPurchases;
  }
  
  private isSameMonth(date: Date, month: number, year: number): boolean {
    return date.getMonth() + 1 === month && date.getFullYear() === year;
  }
  
  private calculateCartTotal(cart: any[]): number {
    return cart.reduce((acc: number, item: any) => {
      return acc + (item.price * item.cantidad);
    }, 0);
  }
  

}
