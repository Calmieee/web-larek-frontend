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

const api = new WebLarekAPI(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#catrd-preview');
const cardbasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const events = new EventEmitter();
const appState = new AppState(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const page = new PageView(document.body, events);
const basket = new Basket(events);
