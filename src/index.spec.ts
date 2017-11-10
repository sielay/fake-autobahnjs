import "jasmine";
import * as fakeAutobahn from "./index";
import { Session } from "./index"
import { server } from "./server";

let backend;

describe("Mockup", () => {

    beforeEach(() => {

        backend = fakeAutobahn.server;
        backend.reset();


    });

    it("In/Out", done => {
        let steps: string = "0";        
        let subscription;
        let session;

        server.onCall("echo", (msg) => server.call("test", "echo", msg));

        const connection = new fakeAutobahn.Connection({
            url: "wss://example.com/ws:8000",
            realm: "test"
        });
        connection.onopen = (sess: Session) => {            
            steps += 'A';
            session = sess;
            session.subscribe("echo", (events: string[]) => {
                expect(events).toEqual(["abc"]);
                steps += "C";
                connection.close();
            })
                .then(sub => {
                    steps += "B"
                    subscription = sub;
                    session.call("echo", "abc")
                });
        };
        connection.onclose = () => {
            session.unsubscribe(subscription);
            expect(steps).toEqual("0ABC");
            done();
        }
        connection.open();
    });

});
