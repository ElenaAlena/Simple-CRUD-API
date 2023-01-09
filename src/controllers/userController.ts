import { IncomingMessage, ServerResponse } from "http";
import {
  internalServerError,
  invalidRequest,
  successResponse,
} from "../utils/notifications.js";
import { parseBody } from "../utils/helper.js";
import { ErrorsMessages } from "../config/messages.js";
import { validateUser } from "../utils/validation.js";
import { IUser } from "../config/user.js";
import { UserCollection } from "../utils/usersList.js";

const usersDb = new UserCollection([]);

const addUser = async (
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> => {
  try {
    const requestBody: IUser = await parseBody(request);
    if (requestBody && validateUser(requestBody)) {
      usersDb.create(requestBody);
      successResponse(response, 200, requestBody);
    } else invalidRequest(response, ErrorsMessages.REQUIRED_FIELDS);
  } catch (err) {
    console.log(err);
    internalServerError(response);
  }
};

const getUsers = (request: IncomingMessage, response: ServerResponse): void => {
  try {
    const users: Array<IUser> = usersDb.users;
    successResponse(response, 200, users);
  } catch (err) {
    console.log(err);
    internalServerError(response);
  }
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
