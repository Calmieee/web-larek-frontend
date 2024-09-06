import { Component } from "../base/component";
import {cloneTemplate, createElement, ensureElement} from "../../utils/utils";
import {EventEmitter} from "../base/events";

interface IBasket {
    items: HTMLElement[];
    total: number
}

export class Basket extends Component<IBasket> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__total');
        this._button = this.container.querySelector('.basket__action');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set selected(items: string[]) {
        if (items.length) {
            this.setStatusDisabled(this._button, false);
        } else {
            this.setStatusDisabled(this._button, true);
        }
    }

    set total(total: number) {
        this.setTextContent(this._total, total.toString() + ' синапсов');
    }
}