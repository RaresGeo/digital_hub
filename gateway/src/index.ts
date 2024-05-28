import { App } from "./app";

const app = new App();

const port: number = isNaN(Number(process.env.PORT))
  ? 8080
  : Number(process.env.PORT);

app.listen(port);
