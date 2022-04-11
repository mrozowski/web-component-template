import { css, html, LitElement } from "lit";
import { customElement, property } from 'lit/decorators.js';
import { Pages } from "../page-definition";
import { LinkTo, Properties } from "../system/router"
import "./button"
@customElement('top-bar')
export class Navigation extends LitElement {

    @property()
    home: any;

    @property()
    about: any;

    render() {
        console.log("nav-bar render");

        return html`
        <nav>
            <button-e .text=${"Home"} @click=${() => LinkTo(Pages.HOME)}>  </button-e>
            <button-e .text=${"About me"} @click=${() => LinkTo(Pages.ABOUT_ME, Properties.create("myValue", "This is some propertie value"))}> About me </button-e>

        </nav>
        `;
    }

    static get styles() {
        return css`
        nav{
            background-color: lightblue;
            width: 100vw;
            height: 10vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        button-e{
            margin-right: 2rem;
        }
        `;
    }
}