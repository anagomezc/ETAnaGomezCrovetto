import { Component, HostListener } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  quantity: number = 1;
  carrito: any
  total: number = 0;
  comprasRegistradas: any[] = [];
  visibilidadCompras: { [key: string]: boolean } = {};
  selectedFechaCompra: string | null = null; 
  clienteEsVipProximaCompra: boolean = false
  descuento: any
  productoMasBarato: any
  totalCompra: any
  isSmallScreen:boolean = false;
  smallScreenBreakpoint:number = 768;

  constructor(private cartService: CartService, private modalService: ModalService){
    const storedData = localStorage.getItem('comprasRegistradas');
    if (storedData) {
      const comprasRegistradas = JSON.parse(storedData);
      this.comprasRegistradas = comprasRegistradas
    }


    this.carrito = this.cartService.obtenerCarritoDesdeSessionStorage();
    
    this.calcularTotal();
    //


  }
  ngOnInit(){
    this.modalService.closeModal('deleteCartModal');
    const carritoIdString = sessionStorage.getItem('carritoId');
    
    if (carritoIdString) {
      const carritoId = parseInt(carritoIdString, 10);
      let total = this.cartService.calcularTotalAPagar(carritoId)
      

    } 
    this.checkScreenSize();

  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= this.smallScreenBreakpoint;
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

  incrementQuantity(producto: any) {
    if (producto.cantidad <20) {
      producto.cantidad++;
      this.calcularTotal();

    }
  }

  decrementQuantity(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.calcularTotal();

    }
  }
  finish(){
    
    this.finalizarCompra()
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

    this.modalService.openModal('generalModal');


  }
 
  openDeleteCartModal(): void {
    this.modalService.openModal('deleteCartModal');
  }
  finalizarCompra(): void {
    const compra = {
      idCarrito: sessionStorage.getItem('carritoId'),
      productos: this.cartService.obtenerCarritoDesdeSessionStorage()?.productos, 
      fechaCompra: new Date().toISOString()
    };

    this.cartService.finalizarCarrito(compra);
  }
  
  verSiEsVip(){
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const totalComprasDelMes = this.comprasRegistradas.reduce((total: number, compra: any) => {
      const fechaCompra = new Date(compra.fechaCompra);
      if (fechaCompra.getMonth() === currentMonth -1) {
        return total + compra.productos.reduce((subtotal: number, item: any) => {
          return subtotal + (item.price * item.cantidad);
        }, 0);
      } else {
        return total;
      }
    }, 0);
    if (totalComprasDelMes > 10000) {
      this.clienteEsVipProximaCompra = true;
    }
    

  }
  calcularTotal() {
    this.verSiEsVip()
    if (!this.carrito || !this.carrito.productos || this.carrito.productos.length === 0) {
      this.total = 0;
      this.totalCompra = 0
      return;
    }
  
    let totalSinDescuento = this.carrito.productos.reduce((total: number, producto: any) => {
      return total + (producto.price * producto.cantidad);
    }, 0);
  
    let cantidadProductos = 0
    for (let i = 0; i < this.carrito.productos.length; i++) {
      cantidadProductos += this.carrito.productos[i].cantidad
    }

    const totalCompra = totalSinDescuento;
    this.totalCompra = totalSinDescuento
    
    if (cantidadProductos === 4) {
      this.total = totalCompra * 0.75;
      
      this.descuento = "Descuento general del 25% por comprar exactamente 4 productos "
    } else if (cantidadProductos > 10) {
      if (this.carrito.tipo === 'comun' && !this.clienteEsVipProximaCompra) {
        this.total = totalCompra - 100;
        
        this.descuento = "Descuento de $100 por comprar más de 10 productos"

      } else if (this.carrito.tipo === 'promocional' && !this.clienteEsVipProximaCompra) {
        this.total = totalCompra - 300;
        this.descuento = "Descuento general de $300 por fecha especial y por comprar más de 10 productos"

      } else if (this.carrito.tipo === 'vip' || this.clienteEsVipProximaCompra) {
        let productosOrdenados = this.carrito.productos.slice().sort((a: any, b: any) => a.price - b.price);
        let productoMasBarato = productosOrdenados[0];
        this.total = totalCompra - 500 - productoMasBarato.price;
        
        this.productoMasBarato = productoMasBarato
        this.descuento =  'Bonificación del producto más barato y descuento general de $500 por tener carrito VIP y comprar más de 10 productos '

      }
    } else {
      this.total = totalCompra;
      this.descuento = null
    }
  
    
  }
  
  
  
  eliminar(p: any){
    if (this.carrito) {
      this.cartService.eliminarProductoDeCarrito(this.carrito.id, p.id);
      this.carrito = this.cartService.obtenerCarritoDesdeSessionStorage();
    }
    this.calcularTotal()
  }
  updateQuantity(producto: Product, nuevaCantidad: number) {
    producto.cantidad = nuevaCantidad;
    this.cartService.guardarCarritoEnSessionStorage(this.carrito);
  }
  
}
