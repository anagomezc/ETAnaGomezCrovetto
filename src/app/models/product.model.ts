export interface Product {
    cantidad: number;
    id: number;
    name: string;
    description: string;
    price: number;
    details: ProductDetails;
    img: string
  }
  
  interface ProductDetails {
    color: string;
    size?: string;
    material?: string
    // Agrega cualquier otra propiedad detallada que necesites
  }
  