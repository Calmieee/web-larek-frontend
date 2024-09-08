export type IOrderForm = Omit<IOrder, 'total' | 'items'>;

export type IFormErrors = Partial<Record<keyof IOrderForm, string>>;

export type IPaymentMethod = 'cash' | 'card';

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
}

export interface IOrder {
    payment: IPaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export interface IFilmAPI {
    getCardList(): Promise<ICard[]>;
    getCardItem(id: string): Promise<ICard>;
    orderCards(order: IOrder): Promise<IOrderResult>;
}

export interface ICardActions {
    onClick(event: MouseEvent): void;
}

export type CardModifier = 'compact' | 'full';