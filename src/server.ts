import { Subscription, SubscribeHandler } from "autobahn";


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
        this.realms = {} as IRealms;
        this.rpcs = {};
    }

    public subscribe(subscription:Subscription) {
        const realmName = subscription.session.realm;
        this.realms[realmName] = this.realms[realmName] || {
            topics: {}
        };
        const realm = this.realms[realmName];
        const topicName = subscription.topic;
        realm.topics[topicName] = realm.topics[topicName] || [];
        realm.topics[topicName].push(subscription.handler);
    }

    public clientCall(procedure:string, args:any) {
        if(this.rpcs[procedure]) {
            this.rpcs[procedure].forEach(h => h(args));
        }
    }

    public call(realmName, topicName, data) {
        const realm = this.realms[realmName];
        if(realm) {
            const topic = realm.topics[topicName];
            if(topic) {                
                topic.forEach(h => h([data]));
            }
        }
    }

    public onCall(procedure, fn) {
        this.rpcs[procedure] = this.rpcs[procedure] || []
        this.rpcs[procedure].push(fn);
    }
}

export const server: Server = new Server();
