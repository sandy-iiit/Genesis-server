

const pass=require('./models/passwordChange')
const mongoose = require("mongoose");



mongoose.connect('mongodb+srv://dattasandeep000:13072003@sandy.p06ijgx.mongodb.net/G1?retryWrites=true&w=majority').then(async r => {

    const pass2 = new pass({
        email: 'datta@gmail.com',
        OTP: '13232422',
        createdAt: new Date()
    })
    await pass2.save()
    console.log('Data Saved.')
})
TWILIO_ACCOUNT_SID = "AC557bfd164123779b6b52a5de0c8171a7"
TWILIO_AUTH_TOKEN = "6ea9ac1c1654b40a62971af142237258"
const account_sid = TWILIO_ACCOUNT_SID
const auth_token = TWILIO_AUTH_TOKEN
const twilio = require('twilio');
const client = twilio(account_sid, auth_token);

client.messages.create({
    body: 'Hello from Twilio!',
    from: '+16813346876',
    to: '+917416226155'
})
    .then(message => console.log(message.sid))
    .catch(error => console.error(error));

