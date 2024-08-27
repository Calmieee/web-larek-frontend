export interface IModalView {
    CloseButton: HTMLButtonElement;
    content: HTMLElement;
    open(): never
    close(): never
    render(data: HTMLElement): HTMLElement    
}