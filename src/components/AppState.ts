import { ICard, IBasket, IOrder, IOrderForm, IFormErrors, IPaymentMethod } from "../types";
import { IEvents } from "./base/events";

export class AppState {
    cardCatalog: ICard[]= [];
    basket: IBasket = {
        items: [],
        total: 0
    };

    orderData: IOrder = {
        payment: 'card',
        email: '',
        phone: '',
        address: '',
        total: 0,
        items: []
    };

    previewCard: ICard = null;
    formErrors: IFormErrors = {};

    constructor(protected events: IEvents) {

    }
    
    setCardCatalog(items: ICard[]): void {
        this.cardCatalog = items;
        this.events.emit('catalog:init', this.cardCatalog);
    }

    setPreviewCard(item: ICard): void {
        this.previewCard = item;
        this.events.emit('preview:change', this.previewCard);
    }

    inBasket(item: ICard) {
        return this.basket.items.includes(item.id);
    }

    appendItemInBasket(item: ICard) {
        this.basket.items.push(item.id);
        this.basket.total += item.price;
        this.events.emit('basket:change', this.basket);
    }

    removeItemFromBasket(item: ICard) {
        this.basket.items = this.basket.items.filter(id => id !== item.id);
        this.basket.total -= item.price;
        this.events.emit('basket:change', this.basket);
    }

    clearBasket() {
        this.basket.items = [];
        this.basket.total = 0;
        this.events.emit('basket:change', this.basket);
    }

    setPaymentMethod(method: IPaymentMethod) {
        this.orderData.payment = method;
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};

        if (!this.orderData.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';
        }

        if (!this.orderData.email) {
            errors.email = 'Необходимо указать email';
        }

        if (!this.orderData.phone) {
            errors.phone = 'Необходимо указать номер телефона';
        }

        if (!this.orderData.address) {
            errors.address = 'Необходимо указать адрес доставки';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
    
    setOrderData(field: keyof IOrderForm, value: string) {
        if (field === 'payment') {
            this.setPaymentMethod(value as IPaymentMethod);
        } else {
            this.orderData[field] = value;
        }
        
        if (this.orderData.payment && this.validateOrder()) {
            this.orderData.total = this.basket.total;
            this.orderData.items = this.basket.items;
            this.events.emit('order:ready', this.orderData);
        }
    };


    

}  
