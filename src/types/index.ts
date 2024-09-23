// Интерфейс получения типизированных данных товара с сервера

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  selected: boolean;
}

// Интерфейс типизированных данных покупателя, получаемых при оформлении заказа

export interface ICustomer {
  payment: string;
  address: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
}

// Интерфейс типизированных данных корзины покупок

export interface IBasket {
	items: HTMLElement[];
	totalCost: number;
}

// Интерфейс типизированных данных результата заказа

export interface IOrderResult {
  total: number;
}

// Интерфейс типизированных данных формы оформления заказа

export interface IAppData {
  basket: IProduct[];
  products: IProduct[];
  customerOrder: ICustomer;
  formErrors: Partial<Record<keyof CustomerForm, string>>;
  addToBasket(product: IProduct): void;
  removeFromBasket(product: IProduct): void;
  clearBasket(): void;
  getBasketAmount(): number;
  setItems(): void;
  setOrderField(field: keyof CustomerForm, value: string): void;
  validateContacts(): boolean;
  validateOrder(): boolean;
  updateOrder(): boolean;
  setStore(items: IProduct[]): void;
  resetSelected(): void;
}

// Интерфейс работы с API

export interface IApi {
 baseUrl: string;
 get<T>(uri: string): Promise<T>;
 post(uri: string, data: object): Promise<object>;
}

// Интерфейс для работы с модальными окнами
export interface IModalData {
	content: HTMLElement;
}

// Список переиспользуемых типов под компоненты приложения

export type CustomerForm = Omit<ICustomer, 'items' | 'total'>;

export type CustomerOrder = Pick<ICustomer, 'payment' | 'address'>;

export type CustomerContacts = Pick<ICustomer, 'email' | 'phone'>;

export type ApiPostMethods = 'POST' | 'PUT';

export type FormErrors = Partial<Record<keyof CustomerForm, string>>;

