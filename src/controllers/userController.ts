import { IncomingMessage, ServerResponse } from "http";
import { successResponse } from "../utils/notifications.js";

const addUser = (request: IncomingMessage, response: ServerResponse): void => {
  successResponse(response, 200, `User was added successfully`);
};

const getUsers = (request: IncomingMessage, response: ServerResponse): void => {
  successResponse(response, 200, `Users list`);
};

const getUser = (request: IncomingMessage, response: ServerResponse): void => {
  successResponse(response, 200, `User`);
};

const updateUser = (
  request: IncomingMessage,
  response: ServerResponse
): void => {
  successResponse(response, 200, `User was updated successfully`);
};

const deleteUser = (
  request: IncomingMessage,
  response: ServerResponse
): void => {
  successResponse(response, 200, `User was deletd successfully`);
};

export const user = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
