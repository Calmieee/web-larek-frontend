import { Api, ApiListResponse } from './base/api';
import { IOrder, IOrderResult, ICard, IFilmAPI } from '../types/types';

export class WebLarekAPI extends Api implements IFilmAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getCardItem(id: string): Promise<ICard> {
        return this.get(`/Card/${id}`).then(
            (data: ICard) => ({
                ...data,
                image: this.cdn + data.image
            })
        );
    }

    getCardList(): Promise<ICard[]> {
        return this.get('/product').then((data: ApiListResponse<ICard>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    orderCards(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }
}
