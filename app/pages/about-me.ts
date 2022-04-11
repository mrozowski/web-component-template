import { css, html, LitElement } from "lit";
import { customElement, property } from 'lit/decorators.js';

@customElement('about-me-page')
export class AboutMe extends LitElement {

    @property()
    myValue: any;

    render() {
        console.log("about me - render");
        return html`
        <section>
            <span>AboutMe</span>
            <div>${this.myValue}</div>
        </section>
        `;
    }

    static get styles() {


        return css`
        section{
            background-color: lightgoldenrodyellow;
            width: 100vw;
            height: 90vh;
        }
        `;
    }
}