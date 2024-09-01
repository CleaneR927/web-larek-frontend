// Интерфейс получения типизированных данных товара с сервера

export interface iProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

// Интерфейс типизированных данных покупателя, получаемых при оформлении заказа

export interface iCustomer {
  address: string;
  email: string;
  telephone: string;
}

// Интерфейс типизированных данных массива товаров 

export interface iProductsData {
  productCards: iProduct[];
  previewCardById: string | null ;
  addProductCard(product: iProduct): void;
  deleteProduct(cardId: string, notification: Function | null): void;
  getProductCard(cardId: string): iProduct;
}

export interface iCustomerData {
  setCustomerInfo(customerData: iCustomer): void;
  checkValidation(data: Record<keyof TCustomerPay, string>): boolean;
  checkValidation(data: Record<keyof TCustomerInfo, string>): boolean;
}

// Список переиспользуемых типов под компоненты приложения

 export type TProductCard = Omit<iProduct, 'description'>;

 export type TProductInfoCard = Omit<iProduct, 'id'>;

 export type TProductFromCart = Pick<iProduct, 'title' | 'price'>;

 export type TCustomerPay = Pick<iCustomer, 'address'>;

 export type TCustomerInfo = Pick<iCustomer, 'telephone' | 'email'>;

