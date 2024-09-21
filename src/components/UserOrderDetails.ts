import { CustomerOrder } from "../types";
import { IEvents } from "./base/EventEmitter";
import { FormDataValid } from "./common/FormDataValid";

export class UserOrderDetails extends FormDataValid<CustomerOrder> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._paymentCard = container.elements.namedItem('card') as HTMLButtonElement;
    this._paymentCash = container.elements.namedItem('cash') as HTMLButtonElement;

    if (this._paymentCash) {
      this._paymentCash.addEventListener('click', () => {
        this._paymentCash.classList.add('button_alt-active')
        this._paymentCard.classList.remove('button_alt-active')
        this.onInputChange('payment', 'cash')
      })
    }
    if (this._paymentCard) {
      this._paymentCard.addEventListener('click', () => {
        this._paymentCard.classList.add('button_alt-active')
        this._paymentCash.classList.remove('button_alt-active')
        this.onInputChange('payment', 'card')
      })
    }
	}

	disableButtons() {
    this._paymentCash.classList.remove('button_alt-active')
    this._paymentCard.classList.remove('button_alt-active')
  }
}
