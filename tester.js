// // //
// // //
// // const pass=require('./models/passwordChange')
// //
// // const mongoose = require("mongoose");
// // //
// // //
// // //
// // // mongoose.connect('mongodb+srv://dattasandeep000:13072003@sandy.p06ijgx.mongodb.net/G1?retryWrites=true&w=majority').then(async r => {
// // //
// // //     const pass2 = new pass({
// // //         email: 'datta@gmail.com',
// // //         OTP: '13232422',
// // //         createdAt: new Date()
// // //     })
// // //     await pass2.save()
// // //     console.log('Data Saved.')
// // // })
// // // TWILIO_ACCOUNT_SID = "AC557bfd164123779b6b52a5de0c8171a7"
// // // TWILIO_AUTH_TOKEN = "6ea9ac1c1654b40a62971af142237258"
// // // const account_sid = TWILIO_ACCOUNT_SID
// // // const auth_token = TWILIO_AUTH_TOKEN
// // // const twilio = require('twilio');
// // // const client = twilio(account_sid, auth_token);
// // //
// // // client.messages.create({
// // //     body: 'Hello from Twilio!',
// // //     from: '+16813346876',
// // //     to: '+917416226155'
// // // })
// // //     .then(message => console.log(message.sid))
// // //     .catch(error => console.error(error));
// // //
// //
// // pass.findOne({token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoiZGF0YSIsImlhdCI6MTY4MjE5MDY5OSwiZXhwIjoxNjgyMTk0Mjk5fQ.3SSjfBhzjtwuyRi7uDqlBlwckIwN6Alu6L19B1VdBk8'}).then(r=>{
// //     console.log(r)
// // })
//
//
// const { MongoClient, ObjectId, GridFSBucket} = require('mongodb');
//
// const mongoose=require('mongoose')
// const {logger} = require("sequelize/lib/utils/logger");
// const arr=[]
// async function deleteFile(strr) {
//     const client = await MongoClient.connect('mongodb+srv://dattasandeep000:13072003@sandy.p06ijgx.mongodb.net/G1?retryWrites=true&w=majority', { useNewUrlParser: true });
//     const db = await client.db();
//
//     const bucket = new GridFSBucket(db);
//
//     const fileIdToDelete =  new mongoose.Types.ObjectId(strr);
//     await bucket.delete(fileIdToDelete);
//
//     console.log('File deleted successfully');
//     client.close();
// }
//
// // deleteFile().catch(console.error);
//
// async function deleteChunks(strr) {
//     const client = await MongoClient.connect('mongodb+srv://dattasandeep000:13072003@sandy.p06ijgx.mongodb.net/G1?retryWrites=true&w=majority', { useNewUrlParser: true });
//     const db = await client.db();
//
//     const bucket = new GridFSBucket(db);
//     const fileIdToDelete =  new mongoose.Types.ObjectId(strr);
//
//     // Delete the associated chunks from the `fs.chunks` collection
//     await db.collection('fs.chunks').deleteMany({ files_id: fileIdToDelete });
//
//     console.log('Chunks deleted successfully');
//     client.close();
// }
//
// for(let i=0;i<arr.length;i++){
//     deleteFile(arr[i]).catch(console.error)
//     deleteChunks(arr[i]).catch(console.error)
// }
//
// // deleteChunks().catch(console.error);

//
// const request = require('supertest');
// const app = require('./app');
// const Review = require('./models/Review'); // Replace this with the path to your Review model file
//
// // Define a dummy transporter function for mocking
// const transporter = {
//     sendMail: jest.fn()
// };
// describe('Testing Routes in app.js', () => {
//     it('should respond with CSRF token', (done) => {
//         request(app)
//             .get('/getCSRFToken')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//
//                 // Check if the response contains the CSRF token
//                 expect(res.body).toHaveProperty('CSRFToken');
//                 expect(typeof res.body.CSRFToken).toBe('string');
//
//                 done();
//             });
//     });
// });
