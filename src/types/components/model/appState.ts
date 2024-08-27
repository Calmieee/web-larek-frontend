import { ICard } from "./card";

interface dataCardforBasket {
    title: string;
    price: number;
}
// '_'  - static
export interface IAppState<T extends ICard, U extends Object> {
    _cardCatalog: T[];
    _basket: Record<string, dataCardforBasket>;
    _OrderData: U;
    previewCard: T[];
    _setCardCatalog<T>(items: T[]): void;
    setPreviewCard<T>(item: ICard): T[] ;
    appendItemInBasket<T extends object>(id: string): T;
    removeItemFromBasket(id: string): void;
    _clearBasket(): void;
    _getBasket<K>(): K;
    _getTotalPrice(): number;
    _validateOrder(): void;
    setOrderData(data: U): U;
    _clearOrder(): void;
}