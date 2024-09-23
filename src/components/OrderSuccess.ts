import { handlePrice } from '../utils/utils';
import { Component } from './base/Component';

interface IOrderSuccess {
	onClick: (event: MouseEvent) => void;
}

export interface ISuccess {
	total: number;
}

export class OrderSuccess extends Component<ISuccess> {
	protected _total: HTMLElement;
	protected _closeButton: HTMLButtonElement;

	constructor(protected container: HTMLFormElement, action?: IOrderSuccess) {
		super(container);

		this._total = container.querySelector('.order-success__description');
		this._closeButton = container.querySelector('.order-success__close');

		if (action?.onClick) {
			if (this._closeButton) {
				this._closeButton.addEventListener('click', action.onClick);
			}
		}
	}

	set total(value: number) {
		this._total.textContent = `Списано: ` + handlePrice(value) + ` синапсов`;
	}
}
