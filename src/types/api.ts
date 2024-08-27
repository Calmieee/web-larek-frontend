export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface ErrorState {
    error: string;
}

export interface HandleResponce {
    handleResponce(response: Response): Promise<object>
}

export interface Api<T extends object> extends HandleResponce {
    baseUrl: string;
    headers: T;
    get(uri: string): HandleResponce;
    post(uri: string, data: object, method: ApiPostMethods): HandleResponce;
}