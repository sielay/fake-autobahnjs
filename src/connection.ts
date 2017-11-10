
import { IConnectionOptions } from "autobahn";
import { Session } from "./session";
import { server } from "./server";
import * as debug from "debug";

const l = debug("fake-autobahnjs - connection");


type IOnOpen = (session: Session, details: any) => void;
type IOnClose = (reason?: string, message?: string) => void


export class Connection {

    private url;
    private realm;
    public isConnected: boolean = false;

    private onOpen: IOnOpen = (session: Session, details: any): void => { };
    private onClose: IOnClose = (reason?: string, message?: string): void => { };

    public set onopen(fn: IOnOpen) {        
        this.onOpen = fn;
    }

    public get onopen(): IOnOpen {
        return this.onOpen;
    }

    public set onclose(fn: IOnClose) {
        this.onClose = fn;
    }

    public get onclose(): IOnClose {
        return this.onClose;
    }

    constructor(options?: IConnectionOptions) {
        l("construct");
        options = options || {};
        this.url = options.url;
        this.realm = options.realm;
    }

    public open(): void {
        l("open");
        const that = this;
        setTimeout(() => {
            l("opening");
            const session: Session = new Session();
            session.realm = that.realm;
            that.isConnected = true;
            if (that.onOpen) {
                that.onOpen(session, null);
            }
            l("opened");
        }, 10);
    }

    public close(reason?: string, message?: string): void {
        l("close");
        const that = this;
        setTimeout(() => {
            l("closing");
            that.isConnected = false;
            if (that.onClose) {
                that.onClose(reason, message);
            }
            l("closed");
        }, 10);
    }

}

