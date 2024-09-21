import { IModalData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/EventEmitter";

export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
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

	open() {
		this.container.classList.add('modal_active');
		document.addEventListener('keyup', this.handleKeyDown);
		this.events.emit('modal:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		document.removeEventListener('keyup', this.handleKeyDown);
		this.events.emit('modal:close');
	}

	private handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
				this.close();
		}
	}

	render(data: IModalData): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}