import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserAuthGuardService } from './services/user-auth-guard.service';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ModifyListComponent } from './modify-list/modify-list.component';
import { ProductStatusComponent } from './product-status/product-status.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PaymentsComponent } from './payments/payments.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routes:Routes=[
  {path:'',component:HomePageComponent},
  {path:'ViewDetails/:id', component:ProductDetailsComponent},
  {path:'login',component:LoginComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'cart',component:CartComponent,canActivate:[UserAuthGuardService]},
  {path:'checkout',component:CheckoutComponent,canActivate:[UserAuthGuardService]},
  {path:'confirmOrder',component:OrderPlacedComponent,canActivate:[UserAuthGuardService]},
  {path:'profile',component:ProfileComponent,children:[
    {path:'personaldetails',component:PersonalDetailsComponent},
    {path:'',component:PersonalDetailsComponent}, 
    {path:'changePassword',component:ChangePasswordComponent},
    {path:'orders',component:OrdersComponent},
    {path:'orderDetails/:id',component:OrderDetailsComponent}
  ],canActivate:[UserAuthGuardService]},
  {path:'admin',component:AdminProfileComponent,children:[
    {path:'addproduct',component:AddProductComponent},
    {path:'modifyList',component:ModifyListComponent},
    {path:'modifyproduct/:id',component:UpdateProductComponent},
    {path:'changePassword',component:ChangePasswordComponent},
    {path:'personaldetails',component:PersonalDetailsComponent},
    {path:'productstatus',component:ProductStatusComponent},
    {path:'orders',component:OrdersComponent},
    {path:'orderDetails/:id',component:OrderDetailsComponent},
    {path:'',component:PersonalDetailsComponent},
  ],canActivate:[AdminAuthGuardService]},
  {path:'**',component:ErrorPageComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    HomePageComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    ProductListComponent,
    ProductFilterComponent,
    OrderPlacedComponent,
    ProfileComponent,
    PersonalDetailsComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ChangePasswordComponent,
    AdminProfileComponent,
    AddProductComponent,
    UpdateProductComponent,
    ModifyListComponent,
    ProductStatusComponent,
    ErrorPageComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,NgxWebstorageModule.forRoot(), BrowserAnimationsModule,MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
