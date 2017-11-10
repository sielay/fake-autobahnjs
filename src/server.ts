import { Subscription, SubscribeHandler } from "autobahn";
import * as debug from "debug";

const l = debug("fake-autobahnjs - server");


interface ITopics {
    [key: string]: SubscribeHandler[]
}

interface IRealm {
    topics: ITopics;
}

interface IRealms {
    [key: string]: IRealm
}

export class Server {
    public realms: IRealms = {} as IRealms;
    private rpcs:ITopics = {};

    public reset() {
        l("reset");
        this.realms = {} as IRealms;
        this.rpcs = {};
    }

    public subscribe(subscription:Subscription) {
        l("subscribe", subscription.topic);
        const realmName = subscription.session.realm;
        this.realms[realmName] = this.realms[realmName] || {
            topics: {}
        };
        const realm = this.realms[realmName];
        const topicName = subscription.topic;
        realm.topics[topicName] = realm.topics[topicName] || [];
        realm.topics[topicName].push(subscription.handler);
    }

    public unsubscribe(subscription:Subscription) {
        l("unsubscribe", subscription.topic);
        const realmName = subscription.session.realm;
        if(!this.realms[realmName]) {
            return;
        }
        const realm = this.realms[realmName];
        const topicName = subscription.topic;
        if(!realm.topics[topicName]) {
            return;
        }
        const index = realm.topics[topicName].indexOf(subscription.handler);
        if(index !== -1) {
            realm.topics[topicName].splice(index, 1);    
        }
    }

    public clientCall(procedure:string, args:any) {
        l("client call", procedure);
        if(this.rpcs[procedure]) {
            this.rpcs[procedure].forEach(h => h(args));
        }
    }

    public call(realmName, topicName, data) {
        l("call", realmName, topicName);
        const realm = this.realms[realmName];
        if(realm) {
            const topic = realm.topics[topicName];
            if(topic) {                
                topic.forEach(h => h([data]));
            }
        }
    }

    public onCall(procedure, fn) {
        l("on rpc call", procedure);
        this.rpcs[procedure] = this.rpcs[procedure] || []
        this.rpcs[procedure].push(fn);
    }
}

export const server: Server = new Server();
