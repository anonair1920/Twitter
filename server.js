import faker, { image, name, internet, lorem } from "faker";
import { parseISO, add } from "date-fns";
import { createServer, Factory, Model, trait } from "miragejs";

faker.seed(123);

let startingDate = parseISO("2021-06-04");
let server = createServer({
  timing: 1000,
  models: {
    tweet: Model,
  },
  factories: {
    tweet: Factory.extend({
      name() {
        return name.findName();
      },
      username() {
        return internet.userName();
      },
      text() {
        return lorem.sentence();
      },
      avatarUrl() {
        return image.avatar();
      },
      date(i) {
        return add(startingDate, { days: i }).toISOString();
      },
      fromAn: trait({
        name: "Ngo An",
        username: "anonair",
        avatarUrl:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fkasirun-hasibuan%2Fart%2Fcat-png-560009438&psig=AOvVaw0fBB4Aal2QtfOFE8yFf09b&ust=1623278100706000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKim8KeMifECFQAAAAAdAAAAABAD",
      }),
    }),
  },
  routes() {
    this.namespace = "api";
    this.get("tweets");
    this.passthrough();
  },
  seeds(server) {
    server.create("tweet", "fromAn", { text: "setting up my twitter!" });
    server.create("tweet", "fromAn", { text: "Hello Twitter!" });
    server.create("tweet", "fromAn", { text: "Good morning, Vietnam!" });
    server.createList("tweet", 50);
  },
});

setInterval(() => {
  server.create("tweet");
}, 5000);
