export type IOrderForm = Omit<IOrder, 'total'|'items' >;

export type IFormErrors = Partial<Record<keyof IOrderForm, string>>;

export type IPaymentMethod = 'cash' | 'card';

export type CardModifier = 'compact' | 'full';

export interface ICard {
    id: string;
    name: string;
    price: number | null;
    description: string;
    image: string;
    category: string;
}

export interface IBasket{
    items: string[];
    total: number;
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

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}