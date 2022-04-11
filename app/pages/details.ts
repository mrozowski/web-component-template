import { css, html, LitElement } from "lit";
import { customElement, property } from 'lit/decorators.js';

@customElement('details-page')
export class Details extends LitElement {

    @property()
    detailsId: any;

    render() {
        console.log("details - render");
        return html`
        <section>
            <span>Details ${this.detailsId}</span>
        </section>
        `;
    }

    static get styles() {

        return css`
        section{
            background-color: lightgray;
            width: 100vw;
            height: 90vh;
        }
        `;
    }
}