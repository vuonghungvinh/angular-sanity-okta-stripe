import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    public oktaAuth: OktaAuthService,
    private router: Router) {}

  public logout() {
    this.oktaAuth.logout();
    this.router.navigate(['/']);
  }
}
