import './scss/styles.scss';
import { EventEmitter } from './components/base/EventEmitter';
import {
	CustomerContacts,
	CustomerForm,
	CustomerOrder,
	IApi,
	IProduct,
} from './types';
import { API_URL } from './utils/constants';
import { Api, ApiListResponse } from './components/base/api';
import { CardItem, CardItemPreview } from './components/CardProduct';
import { cloneTemplate, ensureElement } from './utils/utils';
import { HomePage } from './components/HomePage';
import { AppData } from './components/AppData';
import { Modal } from './components/common/Modal';
import { Basket } from './components/Basket';
import { UserOrderDetails } from './components/UserOrderDetails';
import { UserContactDetails } from './components/UserContactDetails';
import { OrderSuccess } from './components/OrderSuccess';
import { ItemBasket } from './components/ItemBasket';
import { AppApi } from './components/AppApi';

//Экземпляры классов брокера событий и Api
const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL);
const api = new AppApi(baseApi);

// Слушатель на все события
events.onAll((event) => {
	console.log(event.eventName, event.data);
});

// Темплейты карточек, форм и шаблон модального окона
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const modalTemplate = ensureElement<HTMLElement>('#modal-container');

// Модель данных приложения
const appData = new AppData({}, events);

// Глобальный контейнеры данных
const homePage = new HomePage(document.body, events);
const modal = new Modal(modalTemplate, events);

// Переиспользуемые компоненты
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new UserOrderDetails(cloneTemplate(orderTemplate), events);
const contacts = new UserContactDetails(
	cloneTemplate(contactsTemplate),
	events
);
const success = new OrderSuccess(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});

// Запрос серверу на получение карточек
baseApi
api.getProducts()
.then((products: IProduct[]) => {
	appData.setProducts(products);
})
.catch((error) => {
	console.log(`Ошибка в получении данных с сервера:`, error);
});

// Вывод карточек на страницу после получения ответа от сервера и появления события
events.on('cards:change', () => {
	homePage.catalogProducts = appData.products.map((card) => {
		const cardInstant = new CardItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', card),
		});
		return cardInstant.render({
			id: card.id,
			title: card.title,
			price: card.price,
			image: card.image,
			category: card.category,
		});
	});
});

// Открытие карточки по событию клика
events.on('card:select', (item: IProduct) => {
	homePage.lockedScroll = true;
	const product = new CardItemPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			events.emit('card:toBasket', item);
		},
	});
	modal.render({
		content: product.render({
			id: item.id,
			title: item.title,
			image: item.image,
			category: item.category,
			description: item.description,
			price: item.price,
			selected: item.selected,
		}),
	});
});

// Добавление товара в корзину по событию клика
events.on('card:toBasket', (item: IProduct) => {
	item.selected = true;
	appData.addToBasket(item);
	homePage.counterProducts = appData.getBasketAmount();
	modal.close();
});

// Открытие корзины по событию клика
events.on('basket:open', () => {
	homePage.lockedScroll = true;
	const basketItems = appData.basket.map((item, index) => {
		const productItem = new ItemBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('basket:delete', item),
		});
		return productItem.render({
			title: item.title || 'Unnamed',
			price: item.price || 0,
			index: index + 1,
		});
	});
	modal.render({
		content: basket.render({
			items: basketItems,
			totalCost: appData.getTotalBasketPrice(),
		}),
	});
});

// Удалить товар из корзины по событию клика
events.on('basket:delete', (item: IProduct) => {
	appData.deleteFromBasket(item.id);
	item.selected = false;
	basket.totalCost = appData.getTotalBasketPrice();
	homePage.counterProducts = appData.getBasketAmount();
	if (!appData.basket.length) {
		basket.disableButton();
	}
});


// Обновление корзины по событию изменения контента в ней
events.on('cardInBasket: change', () => {
	appData.basket.map((item, index) => {
		const productItem = new ItemBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('basket:delete', item),
		});
		return productItem.render({
			title: item.title || 'Unnamed',
			price: item.price || 0,
			index: index + 1,
		});
	});
})

// Оформить заказ по событию сабмита
events.on('basket:submit', () => {
	modal.render({
		content: order.render({
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось состояние валидации заказа
events.on('orderFormErrors:change', (errors: Partial<CustomerOrder>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

// Изменилось состояние валидации контактов
events.on('contactsFormErrors:change', (errors: Partial<CustomerContacts>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

// Изменились введенные данные покупки
events.on(
	/^order\..*:change/,
	(data: { field: keyof CustomerForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);
// Изменились введенные контактные данные
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof CustomerForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

// Заполнение контактных данных по событию сабмита
events.on('order:submit', () => {
	appData.customerOrder.total = appData.getTotalBasketPrice();
	appData.setItems();
	modal.render({
		content: contacts.render({
			valid: false,
			errors: [],
		}),
	});
});

// Покупка товаров по событию сабмита
events.on('contacts:submit', () => {
	api
		.postOrder(appData.customerOrder)
		.then((res) => {
			events.emit('order:success', res);
			appData.clearBasket();
			appData.updateOrder();
			order.disableButtons();
			homePage.counterProducts = 0;
			appData.resetSelected();
		})
		.catch((err) => {
			console.log('Не удалось оформить заказ:' + err);
		});
});

// Окно успешной покупки по событию сабмита
events.on('order:success', (res: ApiListResponse<string>) => {
	modal.render({
		content: success.render({
			total: res.total,
		}),
	});
});

// Закрытие модального окна по событию клика
events.on('modal:close', () => {
	homePage.lockedScroll = false;
	appData.updateOrder();
});
