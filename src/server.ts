import http, { IncomingMessage, ServerResponse } from "http";
import { ROUTES } from "./config/routes.js";

import { user } from "./controllers/userController.js";
import { urlMatch } from "./utils/helper.js";

import { serverError } from "./utils/notifications.js";

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
  if (req?.url === ROUTES.users && req?.method === "GET") {
    user.getUsers(req, res);
  } else if (req?.url === ROUTES.users && req?.method === "POST") {
    user.addUser(req, res);
  } else if (req?.method === "GET" && urlMatch(req?.url)) {
    user.getUser(req, res);
  } else if (req?.method === "PUT" && urlMatch(req?.url)) {
    user.updateUser(req, res);
  } else if (req?.method === "DELETE" && urlMatch(req?.url)) {
    user.deleteUser(req, res);
  } else {
    serverError(res);
  }
};

export const server = http.createServer(requestListener);
