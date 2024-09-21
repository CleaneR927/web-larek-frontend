import { CustomerContacts } from "../types";
import { IEvents } from "./base/EventEmitter";
import { FormDataValid } from "./common/FormDataValid";

export class UserContactDetails extends FormDataValid<CustomerContacts> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}
}