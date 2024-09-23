import { IApi, ICustomer, IProduct } from "../types";

export class AppApi {
  private _baseApi: IApi;

  constructor(baseApi: IApi) {
    this._baseApi = baseApi;
  }

  getProducts() {
    return this._baseApi.get<{total: number; items: IProduct[]}>('/product').then(response => response.items);
  }

  postOrder(order: ICustomer) {
    return this._baseApi.post('/order', order);
  }
}