import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products: object[];
  private subscriptions: Subscription[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const query = '*[_type == \'product\']{ name, _id, description, price, \'imageUrl\': image.asset->url }';
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    this.subscriptions.push(
      this.http
      .get(`https://9u38s281.api.sanity.io/v1/data/query/demo1?query=${query}`, {headers})
      .subscribe((data) => {
        this.products = data['result'];
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
