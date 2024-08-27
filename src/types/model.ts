export interface IProductList<T> {
    total: number;
    items: T[]
}

export interface IProductitem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IBasket {
    BasketList: Record<string, number>;
    countProductItemInList: number;
    totalPrice(): number;
    appendProduct(id: string): void;
    removeProduct(id: string): void;
}

export interface IOrderDetails {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    setOrderDetails(details: {}): {};
}