const API_KEY = '95c9c771ae02625bbd9690acedc2536d-1c7e8847-01673c2d';
const DOMAIN = 'sandbox5014c6d8804b45ebaab5baafbfe22d71.mailgun.org';

const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });

const EmailSend = () => {
  const messageData = {
    from: 'Excited User <musicShop@gmail.com>',
    to: 'jeans.ariasm@autonoma.edu.co',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
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
