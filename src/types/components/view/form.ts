interface IFormState {
    valid: boolean;
    errors: string[];
}

export interface IFormView<T> {
    buttonSumbit: HTMLButtonElement;
    error: HTMLElement;
    render(state: Partial<T> & IFormState): HTMLElement
}