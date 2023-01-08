import { IncomingMessage } from "http";
import { ROUTES } from "../config/routes.js";

export const urlMatch = (url: string | undefined): boolean =>
  Boolean(url?.match(RegExp(`${ROUTES.users}/([0-9]+)`)));

export const parseBody = (request: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body: string = "";
    request
      .on("data", (chunk) => (body += chunk.toString()))
      .on("end", () => resolve(body))
      .on("error", (err) => reject(err));
  });
};
