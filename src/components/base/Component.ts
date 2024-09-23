export abstract class Component<T> {
	constructor(protected readonly container: HTMLElement) {}

	// Метод, позволяющий переключить класс элемента разметки
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

	// Метод, позволяющий установить текстовое содержимое элемента разметки
	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	// Метод, позволяющий сменить статус блокировки элемента кнопки разметки
	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	// Метод, позволяющий скрыть элемент разметки
	protected setHidden(element: HTMLElement): void {
		element.style.display = 'none';
	}

	// Метод, позволяющий показать элемент разметки
	protected setVisible(element: HTMLElement): void {
		element.style.removeProperty('display');
	}

	// Метод, позволяющий установить изображение с алтернативным текстом
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	// Метод, позволяющий вернуть корневой DOM-элемент
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
