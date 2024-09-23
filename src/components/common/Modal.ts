import { IModalData } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/EventEmitter';

export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('mousedown', (event) => {
			if (event.target === event.currentTarget) {
				this.close();
			}
		});
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	_toggleModal(state: boolean = true) {
		this.toggleClass(this.container, 'modal_active', state);
	}

	private handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			this.close();
		}
	};

	open() {
		this._toggleModal();
		document.addEventListener('keydown', this.handleKeyDown);
		this.events.emit('modal:open');
	}

	close() {
		this._toggleModal(false);
		document.removeEventListener('keydown', this.handleKeyDown);
		this.content = null;
		this.events.emit('modal:close');
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
