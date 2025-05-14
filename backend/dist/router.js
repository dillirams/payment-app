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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const mongoose_1 = __importDefault(require("mongoose"));
exports.userRouter = (0, express_1.Router)();
const zodValidation = zod_1.default.object({
    name: zod_1.default.string().min(5).max(10),
    password: zod_1.default.string().min(4).max(12),
    email: zod_1.default.string().email(),
});
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email, } = req.body;
    const inputValdataion = zodValidation.safeParse(req.body);
    if (!inputValdataion.success) {
        res.status(400).json({
            message: "incorrect input format",
            error: inputValdataion.error
        });
        return;
    }
    try {
        const user = yield db_1.userModel.findOne({
            name: name
        });
        if (user) {
            res.status(400).json({
                message: "user already exist"
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const newUser = yield db_1.userModel.create({
            name: name,
            password: hashedPassword,
            email: email,
        });
        yield db_1.walletModel.create({
            userId: newUser._id,
            balence: 0
        });
        res.status(200).json({
            message: "you signedup successfully"
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: "something went wrong"
        });
    }
}));
exports.userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const user = yield db_1.userModel.findOne({
        name: name
    });
    if (!user) {
        res.status(400).json({
            message: "user does not exist"
        });
        return;
    }
    const decodedPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!decodedPassword) {
        res.status(400).json({
            message: "invalid password"
        });
        return;
    }
    try {
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "logedin successfully",
            token: token
        });
    }
    catch (e) {
        res.status(400).json({
            message: "something went wrong"
        });
    }
}));
exports.userRouter.post('/addmoney', middleware_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const seession = yield mongoose_1.default.startSession();
    //@ts-ignore
    const senderId = req.id;
    const amount = req.body.amount;
    const receiverId = req.body.receiverId.id;
    console.log(receiverId + " receiver id ");
    yield seession.startTransaction();
    try {
        const user = yield db_1.walletModel.findOne({
            userId: senderId
        });
        console.log("user found");
        //@ts-ignore
        if ((user === null || user === void 0 ? void 0 : user.balence) < amount) {
            res.status(400).json({
                message: "insuffient balance"
            });
            yield seession.abortTransaction();
            console.log("insuffient balance");
            return;
        }
        const receiver = yield db_1.walletModel.findOne({
            userId: receiverId
        });
        if (!receiver) {
            res.status(400).json({
                message: "invalid account"
            });
            yield seession.abortTransaction();
            console.log("invalid receiver");
            return;
        }
        yield db_1.walletModel.updateOne({
            userId: senderId
        }, {
            $inc: { balence: -amount }
        });
        yield db_1.walletModel.updateOne({
            userId: receiverId,
        }, {
            $inc: { balence: amount }
        });
        res.status(200).json({
            message: "transmitted successfylly",
        });
    }
    catch (e) {
        console.log(e);
        yield seession.abortTransaction();
        res.status(400).json({
            message: "something went wrong"
        });
    }
    finally {
        yield seession.commitTransaction();
    }
}));
exports.userRouter.get('/money', middleware_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.id;
    try {
        const money = yield db_1.walletModel.findOne({
            userId: userId
        });
        const name = yield db_1.userModel.findOne({
            _id: userId
        });
        const user = yield db_1.userModel.find({ _id: { $ne: userId } });
        console.log(user);
        res.status(200).json({
            name: name === null || name === void 0 ? void 0 : name.name,
            balance: money === null || money === void 0 ? void 0 : money.balence,
            user: user
        });
    }
    catch (e) {
        res.status(400).json({
            message: "something went wrong",
        });
        console.log(e);
    }
}));
