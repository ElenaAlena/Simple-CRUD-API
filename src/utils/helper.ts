import { IncomingMessage } from "http";
import { ROUTES } from "../config/routes.js";
import { IUser } from "../config/user.js";

export const urlMatch = (url: string | undefined): boolean =>
  Boolean(url?.match(RegExp(`${ROUTES.users}/([0-9]+)`)));

export const parseBody = (request: IncomingMessage): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    request.setEncoding('utf-8');
    let body: string = "";
    request
      .on("data", (chunk) => (body += chunk.toString()))
      .on("end", () => resolve(JSON.parse(body)))
      .on("error", (err) => reject(err));
  });
};
