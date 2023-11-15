require('dotenv').config();

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;

const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });

const EmailSend = (verifyCode,guessUser) => {
  const messageData = {
    from: 'Excited User <musicShop@gmail.com>',
    to: 'yansaid21@gmail.com',
    subject: 'verification Code',
    text: `hi jean, this is the verification code: ${verifyCode}, for te user ${guessUser}`
  };

  client.messages.create(DOMAIN, messageData)
    .then((res) => {
      console.log("respuesta dentro del emailer", res);
    })
    .catch((err) => {
      console.error("error dentro del emailer", err);
    });
};

module.exports = {
  EmailSend
};
