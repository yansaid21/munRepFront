require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const smsSend= (verifyCode,guessUser) =>{

    
client.messages
.create({
    body: `hi jean, this is the verification code: ${verifyCode} for the user ${guessUser}`,
    from: '+18622797249',
    to: '+573103767661'
})
.then(message => console.log("message.sid",message.sid));
}
module.exports={
    smsSend
}