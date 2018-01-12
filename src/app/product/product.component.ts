import { Component, OnInit, OnDestroy, Renderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TripeService } from '../shared/tripe.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public product: object;
  public loading: boolean;
  globalListener: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private tripeService: TripeService,
    private router: Router,
    private alertService: AlertService
  ) { }

  private setProduct(id) {
    const query = `*[_id == '${id}']{ name, _id, description, price, 'imageUrl': image.asset->url }`;
    this.subscriptions.push(
      this.tripeService.getProduct(query).subscribe((data) => {
        this.product = data['result'][0];
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.url
        .subscribe((curr) => {
          this.setProduct(curr[1].path);
        })
    );
  }

  public openCheckout() {
    const handler = (<any>window).StripeCheckout.configure({
      // key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      key: 'pk_test_w6Nd4C7sxhTCYwAayCewoR3O',
      locale: 'auto',
      token: (token: any) => {
        this.loading = true;
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        const query = {
          email: token.email,
          amount: this.product['price'] * 100,
          source: token.id,
          description: this.product['description']
        };
        this.tripeService.payment(query).subscribe((data) => {
          this.loading = false;
          this.alertService.success('Payment successful', true);
          console.log(data);
          this.router.navigate(['/']);
        }, (err) => {
          console.log(err);
        });
      }
    });

    handler.open({
      name: this.product['name'],
      description: this.product['description'],
      amount: this.product['price'] * 100
    });

    this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
      handler.close();
    });
  }

  ngOnDestroy() {
    // this.globalListener();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
