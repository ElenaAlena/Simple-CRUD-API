import cluster from "cluster";
import http, { IncomingMessage, RequestListener, ServerResponse } from "http";
import { cpus } from "os";
import { UserCollection } from "../../utils/usersList.js";

export class ClusterApp {
  private _usersDb: UserCollection;
  private _curWorker = 1;
  private _primaryPort: number;
  private _numWorkers;

  constructor(users: UserCollection, port: number) {
    this._usersDb = users;
    this._primaryPort = port;
    this._numWorkers = cpus().length;
  }

  private requestListener: RequestListener = async (
    req: IncomingMessage,
    res: ServerResponse
  ) => {
    cluster.workers![this._curWorker]?.send({ data: this.usersDb });
    const forChildReq = http.request({
      port: this._primaryPort + this._curWorker,
      path: req.url,
      method: req.method,
    });
    forChildReq.on("response", (childRes) => {
      res.statusCode = childRes.statusCode!;
      childRes.pipe(res);
      this._curWorker =
        this._curWorker >= this._numWorkers ? 1 : ++this._curWorker;
    });
    req.pipe(forChildReq);
  };

  public get usersDb(): UserCollection {
    return this._usersDb;
  }

  public set usersDb(users: UserCollection) {
    this._usersDb = users;
  }
}
