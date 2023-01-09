import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
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
  try {
    const userId: string = request?.url?.split("/")[3] ?? "";
    if (validate(userId)) {
      const user: IUser | undefined = usersDb.getUserById(userId);
      user
        ? successResponse(response, 200, user)
        : invalidRequest(response, ErrorsMessages.USER_NOT_EXIST);
    } else {
      invalidRequest(response, ErrorsMessages.USER_NOT_VALID);
    }
  } catch (err) {
    console.log(err);
    internalServerError(response);
  }
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
