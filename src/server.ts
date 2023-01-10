import http, { IncomingMessage, ServerResponse } from "http";
import { ROUTES } from "./config/routes.js";

import { user } from "./controllers/userController.js";

import { serverError } from "./utils/notifications.js";

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
  const withIdParam: string | undefined = req?.url?.split("/")[3];
  if (req?.url === ROUTES.users && req?.method === "GET") {
    user.getUsers(req, res);
  } else if (req?.url === ROUTES.users && req?.method === "POST") {
    user.addUser(req, res);
  } else if (
    withIdParam &&
    req?.method === "GET" &&
    req?.url?.startsWith(ROUTES.user)
  ) {
    user.getUser(req, res, withIdParam);
  } else if (
    withIdParam &&
    req?.method === "PUT" &&
    req?.url?.startsWith(ROUTES.user)
  ) {
    user.updateUser(req, res, withIdParam);
  } else if (
    withIdParam &&
    req?.method === "DELETE" &&
    req?.url?.startsWith(ROUTES.user)
  ) {
    user.deleteUser(req, res, withIdParam);
  } else {
    serverError(res);
  }
};

export const server = http.createServer(requestListener);
