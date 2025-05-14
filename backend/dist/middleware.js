"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = authentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authentication(req, res, next) {
    const token = req.headers.token;
    const decondedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (decondedData) {
        //@ts-ignore
        req.id = decondedData.id,
            next();
    }
    else {
        res.status(400).json({
            message: "something went wrong"
        });
    }
}
