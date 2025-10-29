import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_APP_PASSWORD
    },
});


(async ()=>{
    const info = await transporter.sendMail({
        from: `Alisher Yondoshaliyev <alisheryondoshaliyev77@gmail.com>`,
        to: "alisherdevlog@gmail.com",
        subject: "Test Email from nodemailer",
        html:"<h1> I am Alisher<h1>"
    })

    console.log("Message send:",info.messageId);
    console.log({info});
    
})
