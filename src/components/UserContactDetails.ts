import { CustomerContacts } from "../types";
import { IEvents } from "./base/EventEmitter";
import { Form } from "./common/Form";

export class UserContactDetails extends Form<CustomerContacts> {
	private _email: HTMLInputElement;
	private _phone: HTMLInputElement;
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set email(value: string) {
		this.setText(this._email, value);
	}

	set phone(value: string) {
		this.setText(this._phone, value);
	}
}