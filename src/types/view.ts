export interface IBasketItemView {
    index: number;
}

export interface ICardView {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: string;
    button: HTMLButtonElement;
}

export interface IOrderView {
    SwitchPaymentButtons: HTMLButtonElement[];
}

export interface IPageView {
    counterItemBasket: HTMLElement;
    catalog: HTMLElement;
    darkenedWrapper: HTMLElement;
    basket: HTMLElement;  
}

