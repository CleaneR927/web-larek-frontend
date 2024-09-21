import { IBasket } from "../types";
import { handlePrice } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/EventEmitter";

export class Basket extends Component<IBasket> {
	protected _listItems: HTMLElement;
	protected _totalPrice: HTMLElement;
	protected _buttonSubmit: HTMLButtonElement;

	constructor(container: HTMLElement,  protected events: IEvents) {
		super(container);

		this._listItems = this.container.querySelector('.basket__list');
		this._totalPrice = this.container.querySelector('.basket__price');
		this._buttonSubmit = this.container.querySelector('.basket__button');

		if (this._buttonSubmit) {
			this._buttonSubmit.addEventListener('click', () => {
				events.emit('basket:submit', this.container);
			});
		}
	}

	set totalCost(totalCost: number) {
    this._totalPrice.textContent = handlePrice(totalCost) + ' синапсов';
  }

	set items(items: HTMLElement[]) {
    this._listItems.replaceChildren(...items);
    this._buttonSubmit.disabled = items.length ? false : true;
  }

	disableButton() {
    this._buttonSubmit.disabled = true
  }

	updateIndex() {
    Array.from(this._listItems.children).forEach(
      (item, index) =>
      (item.querySelector(`.basket__item-index`)!.textContent = (
        index + 1
      ).toString())
    );
  }
}
