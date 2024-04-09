import { Component } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Router } from '@angular/router';
import {Product} from '../models/product.model'
import { ModalService } from '../services/modal.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: any[] = []; 
  selectedProduct!: Product;
  constructor( private productService: ProductService, private router: Router, private modalService: ModalService) {
    
  }
  
  ngOnInit(): void {
    this.getProductos()
  
  }
  getProductos(){
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products; 
      console.log("Productos", this.products); 

    });  
  }
  /* openModal(product: Product) {
    this.selectedProduct = product;
    this.modalService.openModal('productModal'); // Abre el modal específico para el producto
  } */
  openModal(product: Product): void {
    this.selectedProduct = product;

    this.modalService.openModal('productModal');
  }
}
