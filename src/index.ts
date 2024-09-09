import './scss/styles.scss';

import { WebLarekAPI } from './components/webLarekAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IOrder, ICard, IOrderForm } from './types/types';
import { CardView } from './components/view/CardView';
import { Modal } from './components/common/Modal';
import { EventEmitter } from './components/base/events';
import { AppState } from './components/model';
import { PageView } from './components/view/PageView';
import { Basket } from './components/common/Basket';
import { OrderView } from './components/view/OrderView';
import { Success } from './components/common/Success';

const api = new WebLarekAPI(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardbasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const events = new EventEmitter();
const appState = new AppState(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const page = new PageView(document.body, events);
const basket = new Basket(events);
const order = new OrderView(events, cloneTemplate(ensureElement<HTMLTemplateElement>('#order')));

api.getCardList()
    .then(appState.setCardCatalog.bind(appState))
    .catch(err => console.log(err));

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});

events.on('catalog:init', (items: ICard[]) => {
    page.catalog = items.map((item) => {
        const card = new CardView(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render(item);
        });
    });

events.on('card:select', (item: ICard) => {
    appState.setPreviewCard(item);
});

events.on('preview:change', (item: ICard) => {
    if (item) {
        const card = new CardView(cloneTemplate(cardPreviewTemplate), {
            onClick: () => {
                if (appState.inBasket(item)) {
                    appState.removeItemFromBasket(item);
                    card.button = 'В корзину';
                } else {
                    appState.appendItemInBasket(item);
                    card.button = 'Удалить из корзины';
                }
            }
        });

        card.button = appState.inBasket(item) ? 'Удалить из корзины': 'В корзину';

        modal.render({
            content: card.render(item)
        });
    } else {
        modal.close();
    }
});

events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    });
});

events.on('basket:change', () => {
    page.counter = appState.basket.items.length;

    basket.items = appState.basket.items.map((id: string) => {
        const item = appState.cardCatalog.find(item => item.id === id);
        const card = new CardView(cloneTemplate(cardbasketTemplate), {
            onClick: () => appState.removeItemFromBasket(item!)

        });

        return card.render(item);
    });
});

events.on('order:open', () => {
    modal.render({
        content: order.render({
            payment: 'card',
            address: '',
            valid: false,
            errors: []
        })
    })
});

events.on('order:submit', () => {
    modal.render({
        content: order.render({
            email: '',
            phone: '',
            valid: false,
            errors: []
        })
    })
});

events.on('order:ready', (order: IOrder) => {
    order.valid = true;
});

events.on('/^order\..*:change/', (data: {field: keyof IOrderForm, value: string}) => {
    appState.setOrderData(data.field, data.value);
});

events.on('success:view', () => {
    api.orderCards(appState.orderData)
        .then((res) => {
            const success = new Success(cloneTemplate(ensureElement<HTMLTemplateElement>('#success')), {
                    onClick: () => {
                        modal.close();
                        appState.clearBasket();
                    },
            });

            modal.render({
                content: success.render(res)
            });
        })

        .catch((err) => {
            console.log(err);
        });
});