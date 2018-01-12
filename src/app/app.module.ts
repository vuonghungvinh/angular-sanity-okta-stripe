import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './shared/auth.guard.service';
import { ProductComponent } from './product/product.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './shared/alert.service';
import { TripeService } from './shared/tripe.service';

const config = {
  issuer: 'https://dev-114210.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:3333/implicit/callback',
  clientId: '0oadfqtqmnC7N3BRW0h7'
};

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(config)
  ],
  providers: [
    AuthGuard,
    AlertService,
    TripeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
