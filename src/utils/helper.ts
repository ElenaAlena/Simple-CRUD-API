import { ROUTES } from "../config/routes.js";

export const urlMatch = (url: string | undefined): boolean =>
  Boolean(url?.match(RegExp(`${ROUTES.users}/([0-9]+)`)));
