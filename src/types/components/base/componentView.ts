export interface ComponentView<T> {
    toggleClass(element: HTMLElement, className: string): void
    setTextContent(element: HTMLElement, value: unknown): void
    setStatusDisabled(element: HTMLElement, state: boolean): void
    toggleVisibility(element: HTMLElement): void
    setImage(element: HTMLImageElement, src: string, alt?: string): void
    render(data?: Partial<T>): HTMLElement
}