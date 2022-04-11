import { Pages } from "../page-definition";
import { PathVariableNotSpecifiedError, VariableNotFoundInPathError } from "./exception";

class _Router {

    private currentPage?: Pages;
    private page404?: Pages;
    private defaultPath?: Pages;
    private properties: Map<string, any> = new Map();

    isActive = (path: Pages): boolean => {
        return this.currentPage === path;
    }

    hasProperties(): boolean {
        return this.properties.size != 0;
    }

    getProperties(): Map<string, any> {
        return this.properties;
    }

    isDefaultPath(path: string): boolean {
        return path == this.defaultPath;
    }

    setDefaultPage(path: Pages) {
        this.defaultPath = path;
    }

    setDefault404Page(page404: Pages) {
        this.page404 = page404;
    }

    linktToDefaultPage() {
        this.currentPage = this.defaultPath;
        window.history.pushState(null, "", this.currentPage)
        window.dispatchEvent(this.createRouteEvent());
    }

    linkTo = (path: string, properties?: Map<string, any>): void => {
        const definedPage = this.findDefinedPage(path);

        if (definedPage !== undefined) {
            this.currentPage = definedPage;
            window.history.pushState(properties, "", path);
        } else {
            if (this.page404 !== undefined) {
                this.currentPage = this.page404;

            } else {
                this.currentPage = this.defaultPath;
            }
            window.history.pushState(properties, "", this.currentPage);
        }

        properties ? this.properties = properties : this.properties.clear();
        window.dispatchEvent(this.createRouteEvent());
    }

    private findDefinedPage(path: string): Pages | undefined {
        if (this.containsParameter(path)) throw new PathVariableNotSpecifiedError(path);
        const page: Pages | undefined = (Object.values<string>(Pages).includes(path)) ? path as Pages : undefined;
        if (page !== undefined) return page;
        return this.findPathWithParameter(path);
    }

    private findPathWithParameter(path: string): Pages | undefined {
        let result: Pages | undefined;
        const definedPages = Object.values<string>(Pages).filter(this.containsParameter);
        const splitArgumentPath: string[] = path.split('/');
        definedPages.some(pagePath => {
            const splitDefinedPage = pagePath.split('/');
            if (splitDefinedPage.length != splitArgumentPath.length) return;

            for (var i = 0; i < splitDefinedPage.length; i++) {
                if (this.containsParameter(splitDefinedPage[i])) continue;
                if (splitArgumentPath[i] === splitDefinedPage[i]) continue;
                return;
            }
            result = pagePath as Pages;
            return true;
        });
        return result
    }

    private containsParameter(path: string): boolean {
        return path.indexOf("{") != -1;
    }

    private createRouteEvent() {
        return new CustomEvent('router', {
            detail: {},
            bubbles: true,
            cancelable: true,
            composed: false,
        });
    }
}

var Router = new _Router();
export default Router;


export function LinkTo(path: Pages, pathVariable?: PathVariable, properties?: Properties): void;

export function LinkTo(path: Pages, property1?: Properties): void;

export function LinkTo(path: Pages, property1?: any, property2?: Properties): void {
    if (property1 && property2) {
        Router.linkTo(updatePathWithVariable(path, property1), property2.getPropertiesAsMap());
        return;
    } else if (property1) {
        if (property1 instanceof Properties) {
            Router.linkTo(path, property1?.getPropertiesAsMap());
            return;
        } else if (property1 instanceof PathVariable) {
            Router.linkTo(updatePathWithVariable(path, property1));
            return;
        }
    }

    Router.linkTo(path);
};

function updatePathWithVariable(path: string, pathVariable: PathVariable): string {
    let counter: number = 0;
    let varStartPos = path.indexOf("{");
    if (varStartPos == -1) throw VariableNotFoundInPathError;
    do {
        const varEndPos = path.indexOf("}", varStartPos);
        const variableSubstring = path.substring(varStartPos, varEndPos + 1);
        path = path.replace(variableSubstring, pathVariable.get(counter++));
        varStartPos = path.indexOf("{", varEndPos);
    } while (varStartPos != -1);

    return path
}


export class Properties {

    private constructor(private map: Map<string, any>) { }

    public static create(name: string, value: any): Properties {
        return new Properties(new Map([[name, value]]))
    }

    public add(name: string, value: any): Properties {
        this.map.set(name, value);
        return this;
    }

    public getPropertiesAsMap(): Map<string, any> {
        return this.map;
    }
}

export class PathVariable {
    private constructor(private variables: string[]) { }

    public static create(...params: string[]): PathVariable {
        return new PathVariable(params);
    }

    get(index: number): string {
        return this.variables[index];
    }
}
