import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model'
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private carritos: Cart[] = [];
  private fechasPromocionables: Date[] = [
    new Date(2024, 4, 25), 
    new Date(2024, 5, 25), 
    new Date(2024, 3, 9), 
    new Date(2024, 8, 15)  
  ];
  
  constructor() { }

  crearCarrito(tipo: 'comun' | 'promocional' | 'vip'): Cart {
    const nuevoCarrito: Cart = {
      id: this.carritos.length + 1,
      tipo,
      productos: []
    };
    this.carritos.push(nuevoCarrito);
    sessionStorage.setItem('carritoId', nuevoCarrito.id.toString());
    this.guardarCarritoEnSessionStorage(nuevoCarrito)

    return nuevoCarrito;

  }

  eliminarCarrito(id: number): void {
    this.carritos = this.carritos.filter(carrito => carrito.id !== id);
    const carritoEnSessionStorage = this.obtenerCarritoDesdeSessionStorage();
    if (carritoEnSessionStorage) {
      sessionStorage.removeItem('carrito');
      console.log("Carrito eliminado, session ahora", sessionStorage.getItem('carrito'))
    }
  }

  agregarProductoACarrito(idCarrito: number, producto: Product, cantidad: number): void {
    let carrito = this.obtenerCarritoDesdeSessionStorage()
    console.log("Carrito", carrito)
    if (!carrito) {
      let user = sessionStorage.getItem('currentUser')
      console.log("user", user)
      
        throw new Error('No se encontró el carrito');
    }

    let productoEnCarrito = carrito.productos.find(p => p.id === producto.id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    } else {
        productoEnCarrito = { ...producto, cantidad: cantidad };
        carrito.productos.push(productoEnCarrito);
    }

    this.guardarCarritoEnSessionStorage(carrito);
}

  eliminarProductoDeCarrito(idCarrito: number, idProducto: number): void {
    const carrito = this.obtenerCarritoDesdeSessionStorage()
    console.log("Carrito", carrito)
    if (carrito) {
      carrito.productos = carrito.productos.filter(p => p.id !== idProducto);
      console.log("Producto eliminado, carrito ahora", carrito)
      this.guardarCarritoEnSessionStorage(carrito);

    }
  }

  calcularTotalAPagar(idCarrito: number): number {
    const carrito = this.carritos.find(c => c.id === idCarrito);
    if (carrito) {
      return carrito.productos.reduce((total, producto) => total + producto.price, 0);
    }
    return 0;
  }
  esFechaPromocionable(fecha: Date): boolean{
    console.log("Esfecha promocionable", fecha, this.fechasPromocionables)
    return this.fechasPromocionables.some(fechaPromocional => {
      return (
        fechaPromocional.getFullYear() == fecha.getFullYear() &&
        fechaPromocional.getMonth() == fecha.getMonth() &&
        fechaPromocional.getDate() == fecha.getDate() +1
        || fecha == fechaPromocional
      );
    });
  }

  guardarCarritoEnSessionStorage(carrito: Cart): void {
    const carritoJson = JSON.stringify(carrito);
    sessionStorage.setItem('carrito', carritoJson);
    console.log(sessionStorage.getItem('carrito'))
  }

  obtenerCarritoDesdeSessionStorage(): Cart | null {
    const carritoJson = sessionStorage.getItem('carrito');
    console.log("Carritojson", carritoJson)
    if (carritoJson) {
      return JSON.parse(carritoJson) as Cart;
    } else {
      return null;
    }
  }
  finalizarCarrito(compra: any): void {
    const comprasRegistradas = JSON.parse(localStorage.getItem('comprasRegistradas') || '[]');
    comprasRegistradas.push(compra);
    localStorage.setItem('comprasRegistradas', JSON.stringify(comprasRegistradas));
  
    this.eliminarCarrito(compra.idCarrito);
    console.log ("Carrito finish, compras regisrtadas:", localStorage.getItem('comprasRegistradas'))
  }
  
}
 