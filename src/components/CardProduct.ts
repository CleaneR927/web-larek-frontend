import { IProduct } from '../types';
import { CDN_URL } from '../utils/constants';
import { handlePrice } from '../utils/utils';
import { Component } from './base/Component';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class CardProduct extends Component<IProduct> {
	protected _cardText: HTMLElement;
	protected _cardButton: HTMLButtonElement;
	protected _cardCategory: HTMLElement;
	protected _cardPrice: HTMLElement;
	protected _cardTitle: HTMLElement;
	protected _cardImage: HTMLImageElement;

	protected _categoryColor = new Map<string, string>([
		['софт-скил', '_soft'],
		['другое', '_other'],
		['дополнительное', '_additional'],
		['кнопка', '_button'],
		['хард-скил', '_hard'],
	]);

	constructor(protected container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._cardText = this.container.querySelector('.card__text');
		this._cardButton = this.container.querySelector('.card__button');
		this._cardCategory = this.container.querySelector('.card__category');
		this._cardPrice = this.container.querySelector('.card__price');
		this._cardTitle = this.container.querySelector('.card__title');
		this._cardImage = this.container.querySelector('.card__image');

		if (actions?.onClick) {
			if (this._cardButton) {
				this._cardButton.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set image(image: string) {
		this.setImage(this._cardImage, CDN_URL + image, this.title);
	}

	set selected(value: boolean) {
		if (!this._cardButton.disabled) {
			this.setDisabled(this._cardButton, value);
		}
	}

	get title(): string {
		return this._cardTitle.textContent || '';
	}

	set title(title: string) {
		this.setText(this._cardTitle, title);
	}

	set price(price: number | null) {
		const value = price ? handlePrice(price) + ' синапсов' : 'Бесценно';
    this.setText(this._cardPrice, value);
		if (this._cardButton && !price) {
			this._cardButton.disabled = true;
		}
	}

	get category(): string {
		return this._cardCategory.textContent || '';
	}

	set category(value: string) {
		this.setText(this._cardCategory, value);
		this._cardCategory?.classList?.remove('card__category_soft');
		this._cardCategory?.classList?.remove('card__category_other');
		this._cardCategory?.classList?.add(
			`card__category${this._categoryColor.get(value)}`
		);
	}

	set description(description: string) {
		this.setText(this._cardText, description);
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}
}

// Наследник CardProduct, отвечающий за отображение карточки в каталоге страницы

export class CardItem extends CardProduct {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
	}
}

// Наследник CardProduct, отвечающий за отображение карточки в модальном окне просмотра

export class CardItemPreview extends CardProduct {
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);

		this._description = container.querySelector(`.card__text`);
	}

	set description(value: string) {
		this._description.textContent = value;
	}
}
