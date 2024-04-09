import { Product } from './product.model';

export interface Cart {
    id: number;
    tipo: 'comun' | 'promocional' | 'vip';
    productos: Product[];
  }
  