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
exports.TransactionHooks = void 0;
exports.TransactionHooks = {
    startTransaction(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.session) {
                return context.session;
            }
            const session = yield context.db.startSession();
            yield session.startTransaction();
            return session;
        });
    },
    commitTransaction(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.session) {
                try {
                    yield context.session.commitTransaction();
                }
                finally {
                    context.session.endSession();
                }
            }
        });
    },
    rollbackTransaction(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.session) {
                try {
                    yield context.session.abortTransaction();
                }
                finally {
                    context.session.endSession();
                }
            }
        });
    },
};
//# sourceMappingURL=transactions.js.map