import { ICustomer, IProduct, IAppData, FormErrors, CustomerForm } from "../types";
import { Model } from "./base/Model";

export class Product extends Model<IProduct> {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  selected: boolean;
}

export class AppData extends Model<IAppData> {
  basket: IProduct[] = [];
  products: IProduct[];
  customerOrder: ICustomer = {
    email: '',
    address: '',
    phone: '',
    payment: '',
    items: [],
    total: null,
  }

  formErrors: FormErrors = {};

  addToBasket(value: IProduct) {
    this.basket.push(value);
    this.events.emit('cardInBasket: change');
  }

  deleteFromBasket(id: string) {
    this.basket = this.basket.filter(item => item.id !== id)
    this.events.emit('cardInBasket: change');
  }

  clearBasket() {
    this.basket.length = 0;
    this.events.emit('cardInBasket: change');
  }

  getBasketAmount() {
    return this.basket.length;
  }

  setItems() {
    this.customerOrder.items = this.basket.map(item => item.id)
  }

  setOrderField(field: keyof CustomerForm, value: string) {
    this.customerOrder[field] = value;

    if (this.validateContacts()) {
      this.events.emit('contacts:ready', this.customerOrder)
    }
    if (this.validateOrder()) {
      this.events.emit('order:ready', this.customerOrder);
    }
  }

  validateContacts() {
    const errors: typeof this.formErrors = {};
    if (!this.customerOrder.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.customerOrder.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('contactsFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  validateOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.customerOrder.address) {
      errors.address = 'Необходимо указать адрес';
    }
    if (!this.customerOrder.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }
    this.formErrors = errors;
    this.events.emit('orderFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  updateOrder() {
    this.customerOrder = {
      email: '',
      address: '',
      phone: '',
      payment: '',
      items: [],
      total: null,
    };
  }

  getTotalBasketPrice() {
    return this.basket.reduce((sum, next) => sum + next.price, 0);
  }

  setProducts(items: IProduct[]) {
    this.products = items.map((item) => new Product({ ...item, selected: false }, this.events));
    this.emitChanges('cards:change', { products: this.products });
  }

  resetSelected() {
    this.products.forEach(products => products.selected = false)
  }
}
