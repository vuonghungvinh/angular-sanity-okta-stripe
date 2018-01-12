import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TripeService {

    constructor(
        private http: HttpClient
    ) { }

    public getProduct(query) {
        return this.http.get(`https://9u38s281.api.sanity.io/v1/data/query/demo1?query=${query}`);
    }

    public payment(query) {
        return this.http.post('http://localhost:3000/charge', query);
    }
}
