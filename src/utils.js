import dotenv from "dotenv";
import "./env";

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
    const options = {
            auth: {
              api_user: process.env.SENDGRID_USERNAME,
              api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) =>{
    const email = {
        from: "koyo@closetgram.com",
        to : adress,
        subject: "Login Secret for Closetgram🔒",
        html: `안녕하세요! 비밀키는 <strong>${secret}</strong> 입니다.<br/>로그인 하시려면 앱에 복사해서 붙여주세요.`
    };
    return sendMail(email);

    
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);