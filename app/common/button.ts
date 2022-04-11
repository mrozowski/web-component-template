import { css, html, LitElement } from "lit";
import { customElement, property } from 'lit/decorators.js';


@customElement('button-e')
export class Navigation extends LitElement {

    @property()
    text: string = "";

    render() {
        console.log("button render");

        return html`
        <div>
            ${this.text}
        </div>
        `;
    }

    static get styles() {
        return css`
        div{
            background-color: rgba(0,0,0,0.2);
            width: 5rem;
            height: 2.5rem;
            cursor: pointer;
            color: #1a1a1a;
            text-align: center;
            line-height: 2.5rem;
            transition: all 0.25s ease-out;
            border-radius: 0.3rem;
        }

        div:hover{
            background-color: rgba(0,0,0,0.1);
        }
        `;
    }
}