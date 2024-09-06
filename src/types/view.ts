export interface IBasketView {
    _basketList: HTMLElement;
    button: HTMLButtonElement;
    totalPrice: string;
}

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

interface IFormState {
    valid: boolean;
    errors: string[];
}

export interface IFormView<T> {
    buttonSumbit: HTMLButtonElement;
    error: HTMLElement;
    render(state: Partial<T> & IFormState): HTMLElement;
}

export interface IModalView {
    CloseButton: HTMLButtonElement;
    content: HTMLElement;
    open(): never;
    close(): never;
    render(data: HTMLElement): HTMLElement;    
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

export interface ISuccessView {
    title: HTMLElement;
    description: HTMLElement;
    totalPrice: string;
}