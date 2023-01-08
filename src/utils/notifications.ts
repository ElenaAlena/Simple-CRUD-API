import { ServerResponse } from "http";

export const serverError = (res: ServerResponse): void => {
  res.statusCode = 404;
  res.end();
};

export const successResponse = (
  res: ServerResponse,
  statusCode: number,
  data?: any
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};
