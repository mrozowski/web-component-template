import { LitElement } from "lit";
import { Pages } from "../page-definition";
import Router from "./router";

export abstract class Controller extends LitElement {
    // This class should be extented by main class that connects with html.

    private pathPrefix: string = "";

    firstUpdated() {
        const pagePath = this.getFullPathName();
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

    setPathPrefix(prefix: string) {
        Router.setPrefix(prefix);
        this.pathPrefix = prefix;
    }

    enableHashRouting() {
        Router.enableHashRouting();
    }

    private checkPath(pagePath: string) {
        if (pagePath == "/" || pagePath == "") return;
        if (!Router.isDefaultPath(pagePath)) {
            Router.linkTo(pagePath);
        }
    }

    private handleRouterEvent = () => {
        this.requestUpdate();
    }

    private historyChangeEvent = (event) => {
        let pagePath = this.getFullPathName(); //window.location.href.replace(window.location.origin, "");
        //pagePath = Router.removePrefixFromPath(pagePath);
        console.log(pagePath);
        console.log(event);

        const properties = event.state;
        if (properties)
            Router.linkTo2(pagePath, properties);
        else
            Router.linkTo2(pagePath);
    }

    private getFullPathName(): string {
        const fullPath = window.location.href.replace(window.location.origin, "");
        return Router.removePrefixFromPath(fullPath);
    }
}




