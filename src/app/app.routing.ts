import { Routes } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './shared/auth.guard.service';
export const appRoutes: Routes = [
    {
      path: 'implicit/callback',
      component: OktaCallbackComponent
    },
    { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard] },
    {
      path: '', component: ProductsComponent, pathMatch: 'full'
    }
];
