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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail(to, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let transporter = nodemailer_1.default.createTransport({
                host: "smtp-relay.brevo.com",
                port: 587, //Number(process.env.SMTP_PORT),
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USERNAME, // generated ethereal user
                    pass: process.env.SMTP_PASSWORD, // generated ethereal password
                },
            });
            let info = yield transporter.sendMail({
                from: "adarshkamble01@gmail.com",
                to,
                subject: "Hello from FlowKit",
                text: body,
            });
            return info;
        }
        catch (error) {
            console.error("Failed to send email:", error);
            throw error; // or handle it however makes sense for your app
        }
    });
}
exports.sendEmail = sendEmail;
