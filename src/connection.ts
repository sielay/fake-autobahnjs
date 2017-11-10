
import { IConnectionOptions } from "autobahn";
import { Session } from "./session";
import { server } from "./server";

type IOnOpen = (session: Session, details: any) => void;
type IOnClose = (reason?: string, message?: string) => void


export class Connection {

    private url;
    private realm;
    private isOpen:boolean = false;

    private onOpen: IOnOpen = (session: Session, details: any): void => { };
    private onClose: IOnClose = (reason?: string, message?: string): void => { };

    public get isConnected() {
        return this.isOpen;
    }

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
        options = options || {};
        this.url = options.url;
        this.realm = options.realm;
    }

    public open(): void {
        const session:Session = new Session();
        session.realm = this.realm;
        this.isOpen = true;
        if(this.onOpen) {
            this.onOpen(session, null);
        }
    }

    public close(reason?: string, message?: string): void {
        this.isOpen = false;
        if(this.onClose) {
            this.onClose(reason, message);
        }
    }

}

