import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { Pages } from "../page-definition";
import Router from "./router";

@customElement('page-module')
export class Page2 extends LitElement {
    // this class can be removed
    @property()
    component: any;

    @property()
    path!: Pages;

    private updateComponentProperties = () => {
        if (Router.hasProperties()) {
            const properties = Router.getProperties();
            properties.forEach((value, key) => {
                this.component.setAttribute(key, value);
            });
        }
    }

    render() {
        if (Router.isActive(this.path)) {
            this.updateComponentProperties();
            return html`${this.component}`;
        }
    }
}

function updateComponentProperties(pageComponent: LitElement) {
    if (Router.hasProperties()) {
        const properties = Router.getProperties();
        properties.forEach((value, key) => {
            pageComponent.setAttribute(key, value);
        });
    }
}

export function PageModule(pageComponent: LitElement, pagePath: Pages): TemplateResult<1> | null {
    if (Router.isActive(pagePath)) {
        updateComponentProperties(pageComponent);
        return html`${pageComponent}
        `;
    }
    return null;
}

