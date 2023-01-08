import { v4 } from "uuid";
import { IUser } from "../config/user.js";

export class UserCollection {
  private _users: Array<IUser>;

  constructor(users: Array<IUser>) {
    this._users = users;
  }

  public getUserById(id: string): IUser {
    return this._users.filter((user) => user.id === id)[0];
  }

  create(data: IUser): IUser {
    const user = { ...data, id: v4() };
    this._users.push(user);
    return user;
  }

  update(id: string, data: IUser): IUser {
    const { username, age, hobbies } = data;

    // Compare input data and save to existing object
    const collectionKey = this._users.findIndex((user) => user.id === id);
    const currentUser = this._users[collectionKey];
    const newUser = Object.assign(currentUser, {
      username,
      age,
      hobbies,
    });

    this._users[collectionKey] = newUser;

    return newUser;
  }

  delete(id: string): void {
    const collectionKey = this._users.findIndex((user) => user.id === id);

    this._users.splice(collectionKey, 1);
  }
}
