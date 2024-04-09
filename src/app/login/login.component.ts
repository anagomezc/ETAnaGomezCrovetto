import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/users.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private cartService: CartService) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      selectedDate: ['']
    });
  }



  onSubmit() {
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      const date = this.form.get('selectedDate')?.value;
      const selectedDate = new Date(date);     
      
       
      const user = this.userService.login(username, password);
      if (user) {
        if (user.vip) {
          
          const nuevoCarrito = this.cartService.crearCarrito('vip');
          

          this.router.navigate(['/home']);

        } else {
          
          const fechaPromocionable = this.cartService.esFechaPromocionable(selectedDate);
          if (fechaPromocionable) {
            
            const nuevoCarrito = this.cartService.crearCarrito('promocional');
            
            this.router.navigate(['/home']);


          } else {
            
            const nuevoCarrito = this.cartService.crearCarrito('comun');
            

            this.router.navigate(['/home']);
          }
          
        } 

      }
    } else{
      
    }
  }
}
