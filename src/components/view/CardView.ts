import { Component } from '../base/component';
import { CardModifier, ICard, ICardActions } from '../../types';
import { bem, ensureElement } from '../../utils/utils';

export class CardView extends Component<ICard> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _price: HTMLElement;
    protected _description?: HTMLElement;
    protected _category?: HTMLElement;
    protected _button?: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);

        this._category = container.querySelector('.card__category');
        this._button = container.querySelector('.card__button');
        this._image = container.querySelector('.card__image');
        this._description = container.querySelector('.card__text');

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    toggle(modifier: CardModifier) {
        this.toggleClass(bem('card', undefined, modifier).name);
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set price(value:number) {
        this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');

        if (this._button) {
            this._button.disabled = !value;
        }
    }

    set category(value: string) {
        this.setText(this._category, value);
    
        if (this._category) {
            // Сбрасываем класс, оставляем только основной класс
            this._category.className = 'card__category';
    
            switch (value) {
                case 'софт-скил':
                    this._category.classList.add('card__category_soft');
                    break;
                case 'хард-скил':
                    this._category.classList.add('card__category_hard');
                    break;
                case 'дополнительное':
                    this._category.classList.add('card__category_additional');
                    break;
                case 'кнопка':
                    this._category.classList.add('card__category_button');
                    break;
                case 'другое':
                    this._category.classList.add('card__category_other');
                    break;
                default:
                    this._category.classList.add('card__category_unknown');
            }
        }
    }
    

    set image(value: string) {
        this.setImage(this._image, value, this.title);
    }
    
    set description(value: string) {
        this.setText(this._description, value);
    }

    set button(value: string) {
        this.setText(this._button, value);
    }

}
