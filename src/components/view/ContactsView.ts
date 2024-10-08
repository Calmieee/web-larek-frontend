import { Form } from "../common/Form";
import { IOrderForm } from "../../types";

export class Contacts extends Form<IOrderForm> {
    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }
}