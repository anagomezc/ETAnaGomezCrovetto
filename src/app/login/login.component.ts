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
      console.log("Selected date", selectedDate)
       console.log("Logueando", username, password);
      const user = this.userService.login(username, password);
      if (user) {
        if (user.vip) {
          console.log('El usuario es VIP.');
          const nuevoCarrito = this.cartService.crearCarrito('vip');
          console.log('Nuevo carrito creado:', nuevoCarrito);

          this.router.navigate(['/home']);

        } else {
          console.log('El usuario no es VIP.');
          const fechaPromocionable = this.cartService.esFechaPromocionable(selectedDate);
          if (fechaPromocionable) {
            console.log('La fecha es promocionable.');
            const nuevoCarrito = this.cartService.crearCarrito('promocional');
            console.log('Nuevo carrito creado:', nuevoCarrito);
            this.router.navigate(['/home']);


          } else {
            console.log('La fecha no es promocionable.');
            const nuevoCarrito = this.cartService.crearCarrito('comun');
            console.log('Nuevo carrito creado:', nuevoCarrito);

            this.router.navigate(['/home']);
          }
          
        } 

      }
    } else{
      console.log("Form invalid")
    }
  }
}
