import { IProduct } from "../types";
import { handlePrice } from "../utils/utils";
import { Component } from "./base/Component";

interface IItemBasketActions {
  onClick: (event: MouseEvent) => void;
}

interface IProductBasket extends IProduct {
  index: number | null;
}

export class ItemBasket extends Component<IProductBasket> {
  protected _indexItem: HTMLElement;
  protected _titleItem: HTMLElement;
  protected _priceItem: HTMLElement;
  protected _buttonItem: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IItemBasketActions) {
    super(container);

    this._titleItem = container.querySelector(`.card__title`);
    this._indexItem = container.querySelector(`.basket__item-index`);
    this._priceItem = container.querySelector(`.card__price`);
    this._buttonItem = container.querySelector(`.basket__item-delete`);

    if(this._buttonItem) {
      this._buttonItem.addEventListener('click', (evt) => {
        this.container.remove();
        actions?.onClick(evt);
      });
    }
  }

  set title(value: string) {
    this._titleItem.textContent = value;
  }

  set index(value: number) {
    this._indexItem.textContent = value.toString();
  }

  set price(value: number) {
    this._priceItem.textContent = handlePrice(value) + ' синапсов';
  }
}