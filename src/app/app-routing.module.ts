import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: ProductsComponent},
  { path: 'about-us', component: AboutUsComponent},
  {path: 'user', component: UserComponent},
  {path: 'cart', component: CartComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
