export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IBasket{
    items: string[];
    total: number;
}

export interface IAppState<T extends ICard, U extends Object> {
    cardCatalog: ICard[];
    basket: IBasket;
    orderData: IOrder;
    previewCard: ICard | null;
    // setCardCatalog(items: T[]): void;
    // setPreviewCard(item: ICard): void;
    // appendItemInBasket(item: string): void;
    // removeItemFromBasket(item: string): void;
    // clearBasket(): void;
    // validateOrder(): void;
    // setOrderData(data: U): U;
}

export type IPaymentMethod = 'cash' | 'card';

export interface IOrder {
    payment: IPaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export type IOrderForm = Omit<IOrder, 'total' | 'items'>

export type IFormErrors = Partial<Record<keyof IOrderForm, string>>