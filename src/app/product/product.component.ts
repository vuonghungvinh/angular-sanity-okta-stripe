import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public product: object;
  private subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  private setProduct(id) {
    const query = `*[_id == '${id}']{ name, _id, description, price, 'imageUrl': image.asset->url }`;
    this.subscriptions.push(
      this.http
      .get(`https://9u38s281.api.sanity.io/v1/data/query/demo1?query=${query}`)
      .subscribe((data) => {
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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
