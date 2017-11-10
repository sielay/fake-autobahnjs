import { Session as ISession, IPublication, RegisterEndpoint, IRegisterOptions, IPublishOptions, ICallOptions, SubscribeHandler, ISubscribeOptions, ISubscription, IRegistration } from "autobahn";
import { Promise as WPromise } from "when";
import * as WPromiseFactory from "when";
import { server } from "./server";

export class Session {

    public id: number;
    public realm: string;
    public isOpen: boolean;
    public features: any;
    public caller_disclose_me: boolean;
    public publisher_disclose_me: boolean;
    public subscriptions: ISubscription[][];
    public registrations: IRegistration[];

    // constructor(transport: ITransport, defer: DeferFactory, challenge: OnChallengeHandler);
    constructor() {

    }

    public join(realm: string, authmethods: string[], authid: string): void {
        // TBD
    }

    public leave(reason: string, message: string): void {
        // TBD
    }

    public call<TResult>(procedure: string, args?: any[], kwargs?: any, options?: ICallOptions): any { //WPromise<TResult> {
        server.clientCall(procedure, args);
    }

    publish(topic: string, args?: any[], kwargs?: any, options?: IPublishOptions): WPromise<IPublication> {
        return null;
    }

    public subscribe(topic: string, handler: SubscribeHandler, options?: ISubscribeOptions): WPromise<ISubscription> {
        const ref = this;
        const subscription: ISubscription = {
            topic: topic,
            handler: handler,
            options: options,
            session: ref as ISession,
            id: Date.now() + Math.round(Math.random() * 100000),
            active: true,
            unsubscribe: () => ref.unsubscribe(subscription),
        }
        server.subscribe(subscription);
        return WPromiseFactory(subscription);
    }

    public register(procedure: string, endpoint: RegisterEndpoint, options?: IRegisterOptions): WPromise<IRegistration> {
        return null;
    }

    public unsubscribe(subscription: ISubscription): WPromise<any> {
        return null;
    }

    public unregister(registration: IRegistration): WPromise<any> {
        return null;
    }

    public prefix(prefix: string, uri: string): void {
        // TBD
    }

    public resolve(curie: string): string {
        return null;
    }

    public onjoin(roleFeatures: any): void {
        // TBD
    }
    public onleave(reason: string, details: any): void {
        // TBD
    }
}
