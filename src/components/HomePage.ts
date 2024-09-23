import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/EventEmitter';

interface IHomePage {
	catalogProducts: HTMLElement[];
	counterProducts: number;
	lockedScroll: boolean;
}

export class HomePage extends Component<IHomePage> {
	protected _catalogProducts: HTMLElement;
	protected _counterProducts: HTMLElement;
	protected _wrapperContainer: HTMLElement;
	protected _basketButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._catalogProducts = ensureElement<HTMLElement>('.gallery');
		this._counterProducts = ensureElement<HTMLElement>(
			'.header__basket-counter'
		);
		this._wrapperContainer = ensureElement<HTMLElement>('.page__wrapper');
		this._basketButton = ensureElement<HTMLButtonElement>('.header__basket');

		this._basketButton.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set counterProducts(value: number) {
		this.setText(this._counterProducts, String(value));
	}

	set catalogProducts(items: HTMLElement[]) {
		this._catalogProducts.replaceChildren(...items);
	}

	set lockedScroll(value: boolean) {
		this.toggleClass(this._wrapperContainer, 'page__wrapper_locked', value);
	}
}
