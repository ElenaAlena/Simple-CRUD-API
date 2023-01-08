import { IncomingMessage, ServerResponse } from "http";
import { invalidRequest, successResponse } from "../utils/notifications.js";
import { parseBody } from "../utils/helper.js";
import { ErrorsMessages } from "../config/messages.js";

const addUser = async (
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> => {
  try {
    const requestBody = await parseBody(request);
    if (requestBody) {
      successResponse(response, 200, `User was added successfully`);
    } else invalidRequest(response, ErrorsMessages.REQUIRED_FIELDS);
  } catch (err) {}
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
