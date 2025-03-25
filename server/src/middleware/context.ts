import mongoose, { ClientSession, Document, Model } from "mongoose";
import { Request, Response, NextFunction, RequestHandler } from "express";

export class RequestContext {
  public params: Record<string, any>;
  public body: any;
  public user?: {
    id: string;
    email: string;
    role: string;
  };
  private _session?: ClientSession;

  constructor(
    public db: mongoose.Connection,
    public req: Request,
    public res: Response
  ) {
    this.params = req.params;
    this.body = req.body;
    this.user = req.user as { id: string; email: string; role: string };
  }

  get session(): ClientSession | undefined {
    return this._session;
  }

  async withTransaction<T>(
    callback: (session: ClientSession) => Promise<T>
  ): Promise<T> {
    // If already in a transaction, just run the callback
    if (this._session) {
      return callback(this._session);
    }

    const session = await this.db.startSession(); // Start a new transaction

    try {
      let result: T;
      await session.withTransaction(async () => {
        this._session = session;
        result = await callback(session);
      });

      return result!;
    } catch (error) {
      throw error;
    } finally {
      this._session = undefined;
      session.endSession();
    }
  }

  /**
   * Helper method to run a query within the current transaction (if exists)
   * @param model Mongoose model
   * @param query Query to be executed
   */
  async runQuery<T extends Document>(
    model: Model<T>,
    query: (model: Model<T>, session?: ClientSession) => Promise<T | T[] | null>
  ): Promise<T | T[] | null> {
    return query(model, this._session);
  }
}

export const contextMiddleware = (db: mongoose.Connection): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    (req as any).context = new RequestContext(db, req, res);
    next();
  };
};

// import { Prisma, PrismaClient } from "@prisma/client";
// import { Request, Response, NextFunction, RequestHandler } from "express";

// export class RequestContext {
//   public params: Record<string, any>;
//   public body: any;
//   public user?: {
//     id: string;
//     email: string;
//     role: string;
//   };
//   private _transaction?: Prisma.TransactionClient;

//   constructor(
//     public prisma: PrismaClient,
//     public req: Request,
//     public res: Response
//   ) {
//     this.params = req.params;
//     this.body = req.body;
//     this.user = req.user as { id: string; email: string; role: string };
//   }

//   get db(): Prisma.TransactionClient | PrismaClient {
//     return this._transaction || this.prisma;
//   }

//   get transaction(): Prisma.TransactionClient | undefined {
//     return this._transaction;
//   }

//   set transaction(value: Prisma.TransactionClient | undefined) {
//     this._transaction = value;
//   }

//   async withTransaction<T>(callback: () => Promise<T>): Promise<T> {
//     // If already in a transaction, just run the callback
//     if (this._transaction) {
//       return callback();
//     }

//     // Start a new transaction
//     return this.prisma.$transaction(async (prisma) => {
//       this._transaction = prisma; // Set the transaction client for nested calls

//       try {
//         const result = await callback(); // Execute the callback with the transaction client

//         this._transaction = undefined; // Reset the transaction client after completion

//         return result;
//       } catch (error) {
//         this._transaction = undefined; // Reset the transaction client in case of error

//         throw error;
//       }
//     });
//   }
// }

// export const contextMiddleware = (prisma: PrismaClient): RequestHandler => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     (req as any).context = new RequestContext(prisma, req, res);
//     next();
//   };
// };
