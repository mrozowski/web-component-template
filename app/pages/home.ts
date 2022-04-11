import { css, html, LitElement } from "lit";
import { customElement, property } from 'lit/decorators.js';
import { Pages } from "../page-definition";

import { LinkTo, PathVariable, Properties } from "../system/router";


@customElement('home-page')
export class Home extends LitElement {
    @property()
    data!: any;

    @property()
    data2?: any = "asda";

    setData(value: any): Home {
        this.data = value;
        return this;
    }

    setData2(value: any): Home {
        this.data2 = value;
        return this;
    }

    render() {
        console.log("home - render");

        return html`
        <section>
            <span>Home</span>
            <button @click=${() => LinkTo(Pages.DETAILS, Properties.create("detailsId", "1"))}> details 1 </button>
            <button @click=${() => LinkTo(Pages.DETAILS, PathVariable.create("1"))}> details 2 </button>
            <button @click=${() => LinkTo(Pages.DETAILS, PathVariable.create("2", "3"), Properties.create("detailsId", "3"))}> details 3 </button>
            <button @click=${() => LinkTo(Pages.DETAILS)}> details 4 </button>
            <p>${this.data}</p>
        <p>${this.data2}</p>
        </section>
       
        `;
    }

    static get styles() {

        return css`
        section{
            background-color: lightgreen;
            width: 100vw;
            height: 90vh;
        }
        `;
    }
}

