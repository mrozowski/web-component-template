import { css, html, LitElement } from "lit";
import { customElement } from 'lit/decorators.js';
import { Pages } from "../page-definition";
import { LinkTo } from "../system/router";
import "../common/button"

@customElement('not-found-page')
export class NotFound extends LitElement {

    render() {
        return html`
        <section>
            <span>Page not found</span>
            <button-e .text=${"Go Back"} @click=${() => LinkTo(Pages.HOME)}></button-e>
        </section>
        `;
    }

    static get styles() {
        return css`
        section{
            background-color: lightcoral;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        span{
            font-size: 10rem;
            color: white;
            font-weight: bold;
        }
        `;
    }
}