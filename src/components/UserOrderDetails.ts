import { CustomerOrder } from '../types';
import { IEvents } from './base/EventEmitter';
import { Form } from './common/Form';

export class UserOrderDetails extends Form<CustomerOrder> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._paymentCard = container.elements.namedItem(
			'card'
		) as HTMLButtonElement;
		this._paymentCash = container.elements.namedItem(
			'cash'
		) as HTMLButtonElement;

		if (this._paymentCash) {
			this._paymentCash.addEventListener('click', () => {
				this.toggleCash();
				this.toggleCard(false);
				this.onInputChange('payment', 'cash');
			});
		}
		if (this._paymentCard) {
			this._paymentCard.addEventListener('click', () => {
				this.toggleCard();
				this.toggleCash(false);
				this.onInputChange('payment', 'card');
			});
		}
	}

	toggleCard(state: boolean = true) {
		this.toggleClass(this._paymentCard, 'button_alt-active', state);
	}

	toggleCash(state: boolean = true) {
		this.toggleClass(this._paymentCash, 'button_alt-active', state);
	}

	disableButtons() {
		this.toggleClass(this._paymentCash, 'button_alt-active', false);
		this.toggleClass(this._paymentCard, 'button_alt-active', false);
	}
}
