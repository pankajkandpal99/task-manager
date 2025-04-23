"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextMiddleware = exports.RequestContext = void 0;
class RequestContext {
    constructor(db, req, res) {
        this.db = db;
        this.req = req;
        this.res = res;
        this._params = Object.assign({}, (req.params || {}));
        this.body = req.body || {};
        this.user = req.user;
        this.files = req.files;
        this.imageVariants = req.imageVariants;
        this.query = Object.fromEntries(Object.entries(req.query || {}).map(([key, value]) => [
            key,
            typeof value === "string" ? value : undefined,
        ]));
    }
    get params() {
        return Object.assign(Object.assign({}, this._params), (this.req.params || {}));
    }
    set params(value) {
        this._params = value;
        Object.assign(this.req.params, value);
    }
    get session() {
        return this._session;
    }
    withTransaction(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._session) {
                return callback(this._session);
            }
            const session = yield this.db.startSession();
            this._session = session;
            try {
                let result;
                yield session.withTransaction(() => __awaiter(this, void 0, void 0, function* () {
                    result = yield callback(session);
                }));
                return result;
            }
            catch (error) {
                if (session.transaction.isActive) {
                    yield session.abortTransaction();
                }
                throw error;
            }
            finally {
                this._session = undefined;
                yield session.endSession();
            }
        });
    }
    runQuery(model, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return query(model, this._session);
        });
    }
}
exports.RequestContext = RequestContext;
const contextMiddleware = (db) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        req.params = req.params || {};
        const context = new RequestContext(db, req, res);
        req.context = context;
        res.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
            if (context.session) {
                try {
                    yield context.session.endSession();
                }
                catch (error) {
                    console.error("Error cleaning up session:", error);
                }
            }
        }));
        next();
    });
};
exports.contextMiddleware = contextMiddleware;
//# sourceMappingURL=context.js.map