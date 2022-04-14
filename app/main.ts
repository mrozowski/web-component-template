import { html } from "lit";
import { customElement } from 'lit/decorators.js';
import './common/top-bar';
import "./system/page"
import { Home } from "./pages/home";
import { AboutMe } from "./pages/about-me";
import { Controller } from "./system/controller";
import { Pages } from "./page-definition";
import { NotFound } from "./pages/not-found";
import { Details } from "./pages/details";
import Router from "./system/router";
import { PageModule } from "./system/page";


@customElement('main-module')
export class Main extends Controller {

    constructor() {
        super();
        this.setDefault404Page(Pages.NOT_FOUND);
        // this.setDefaultPage(Pages.HOME);
        this.setPathPrefix("/web-component-template");
        this.enableHashRouting();
    }


    setHome() {
        // Use method to create Page component with properties
        const home = new Home();
        home.data = "set data 1";
        home.data2 = "set data 2";
        return home;
    }

    render() {

        if (Router.isActive(Pages.NOT_FOUND))
            return PageModule(new NotFound(), Pages.NOT_FOUND);

        return html`
        <top-bar></top-bar>
        ${PageModule(this.setHome(), Pages.HOME)}
        ${PageModule(new AboutMe(), Pages.ABOUT_ME)}
        ${PageModule(new Details(), Pages.DETAILS)}
        `
    }
}

// if (Router.isActive(Pages.NOT_FOUND)) {
//     return html`
//     <page-module
//         .component=${new NotFound()}
//         .path=${Pages.NOT_FOUND}>
//      </page-module>
//     `
// }

// <page-module
// .component=${this.setHome()}
// .path=${Pages.HOME}>
// </page-module>

//  <page-module
// .component=${new AboutMe()}
// .path=${Pages.ABOUT_ME}>
// </page-module>

// <page-module
// .component=${new Details()}
// .path=${Pages.DETAILS}>
// </page-module>