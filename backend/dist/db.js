"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionModel = exports.walletModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    phone: Number
});
const walletSchema = new Schema({
    userId: { type: mongoose_1.default.Schema.ObjectId, ref: "user" },
    balence: Number,
});
const transaction = new Schema({
    walletId: { type: mongoose_1.default.Schema.ObjectId, ref: "wallet" },
    transactionType: { type: String, enum: ['credit', 'debit'] },
    amount: { type: Number, require: true }
});
exports.userModel = mongoose_1.default.model("user", userSchema);
exports.walletModel = mongoose_1.default.model("wallet", walletSchema);
exports.transactionModel = mongoose_1.default.model("transaction", transaction);
