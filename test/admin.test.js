const request = require('supertest');
process.env.PORT = '4001';

const app = require('../app'); // Assuming the file path to your Express app is correct
const queries = require('../models/Query');
const mongoose = require("mongoose"); // Assuming the file path to your queries model is correct

describe('Testing postAnswer function', () => {
    it('should post an answer to a query', (done) => {
        // Create a mock query object
        const mockQueryData = {
            queryId: '9suydwieu2eo223', // Replace with a unique query ID
            // Other necessary properties for the query object
            // For example:
            question: 'Your question here',
            status: 'Pending',
            userId: 'User ID who submitted the query',
            askedBy: new mongoose.Types.ObjectId(),
            answer: 'Your answer here'            // other properties...
        };

        // Save the mock query object to the database
        const mockQuery = new queries(mockQueryData);
        mockQuery.save().then((savedQuery) => {
            // Make a POST request to the route with the queryId parameter
            request(app)
                .post(`/queries/${savedQuery.queryId}`)
                .send({
                    answer: 'Your answer here', // Replace with the answer you want to post
                    name: 'Agent Name', // Replace with the name of the agent
                    userId: 'Agent User ID', // Replace with the ID of the agent user
                    question: 'Your question here',
                    status: 'Pending',
                    askedBy: new mongoose.Types.ObjectId(),
                    // other properties...
                })
                .expect(200) // Expect a 200 status code for a successful response
                .end((err, res) => {
                    if (err) return done(err);
                    // Optionally, you can check the response body for any specific data
                    // For example, if your response body contains a message:
                    // expect(res.body.msg).toBe('Query Answered!');
                    done();
                });
        }).catch((err) => {
            done(err); // If there's an error saving the query object, fail the test
        });
    },20000);
});
