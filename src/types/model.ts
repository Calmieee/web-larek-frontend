export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

interface dataCardforBasket {
    title: string;
    price: number;
}

export interface IAppState<T extends ICard, U extends Object> {
    cardCatalog: T[];
    basket: Record<string, dataCardforBasket>;
    OrderData: U;
    previewCard: T[];
    setCardCatalog<T>(items: T[]): void;
    setPreviewCard<T>(item: ICard): T[] ;
    appendItemInBasket<T extends object>(id: string): T;
    removeItemFromBasket(id: string): void;
    clearBasket(): void;
    getBasket<K>(): K;
    getTotalPrice(): number;
    validateOrder(): void;
    setOrderData(data: U): U;
    clearOrder(): void;
}