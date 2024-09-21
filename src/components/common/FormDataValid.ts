import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/EventEmitter";

interface IFormDataValidState {
  valid: boolean;
  errors: string[];
}

export class FormDataValid<T> extends Component<IFormDataValidState> {
	protected _submitButton: HTMLButtonElement;
	protected _errorsData: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
		this._errorsData = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
    this.events.emit('orderInput:change', {
      field,
      value,
    })
  }

	set valid(value: boolean) {
		this._submitButton.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errorsData, value);
	}

	render(state: Partial<T> & IFormDataValidState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}