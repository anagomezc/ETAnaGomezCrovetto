export class User {
    constructor(
      public id: number,
      public username: string,
      public password: string,
      public cart: any[] = [], 
      public purchaseHistory: any[] = [] ,
      public vip: boolean 
   ) {}
  }
  