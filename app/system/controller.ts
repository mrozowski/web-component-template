import { LitElement } from "lit";
import { Pages } from "../page-definition";
import Router from "./router";


export abstract class Controller extends LitElement {
    // This class should be extented by main class that connects with html.

    firstUpdated() {
        const pagePath = window.location.pathname;
        window.addEventListener('router', this.handleRouterEvent);
        window.addEventListener('popstate', this.historyChangeEvent);
        Router.linktToDefaultPage();
        this.checkPath(pagePath);
    }

    setDefault404Page(page404: Pages) {
        Router.setDefault404Page(page404);
    }

    setDefaultPage(page: Pages) {
        Router.setDefaultPage(page);
    }

    private checkPath(pagePath: string) {
        if (pagePath === "" || pagePath === "/") return;
        if (!Router.isDefaultPath(pagePath)) {
            Router.linkTo(pagePath);
        }
    }

    private handleRouterEvent = () => {
        this.requestUpdate();
    }

    private historyChangeEvent(event) {
        const pagePath = window.location.pathname;
        const properties = event.state;
        if (properties)
            Router.linkTo(pagePath, properties);
        else
            Router.linkTo(pagePath);
    }
}




