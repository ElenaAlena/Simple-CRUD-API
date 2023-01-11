import { resolve } from "path";
import * as dotenv from "dotenv";
import { UserCollection } from "./utils/usersList.js";
import { App } from "./controllers/modules/app.js";

const envPath = resolve(process.cwd(), ".env");

dotenv.config({ path: envPath });

const usersDb = new UserCollection([]);

new App(usersDb, +(process.env.PORT ?? 3000)).startServer();
