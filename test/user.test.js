
const request = require('supertest');
process.env.PORT = '4000';

const app = require('../app'); // Replace this with the path to your Express app file
const User = require('../models/User'); // Replace this with the path to your User model file
const Review = require('../models/Review'); // Replace this with the path to your Review model file

const { GetMyPolicies } = require('../controllers/user'); // Assuming the file path is correct


jest.mock('../models/Review'); // Mocking Review model

describe('Testing API Endpoints', function() {
    afterEach(function() {
        jest.clearAllMocks();
    });

    it('should drop a review', function(done) {
        Review.prototype.save.mockResolvedValueOnce({}); // Mocking save method of Review model

        // Make request without CSRF token
        request(app)
            .post('/drop-review')
            .send({ name: 'John Doe', email: 'john@example.com', review: 'Great service!' })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                // Check if the review is saved in the database
                expect(Review.prototype.save).toHaveBeenCalled();

                done(); // Call done() to indicate that the test is complete
            });
    });
    it('should retrieve all reviews', function(done) {
        const mockReviews = [{ /* Mock review data */ }, { /* Mock review data */ }];
        Review.find.mockResolvedValueOnce(mockReviews); // Mocking find method of Review model

        request(app)
            .get('/reviews')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                // Check if the response contains the expected reviews
                expect(res.body).toEqual(mockReviews);

                done(); // Call done() to indicate that the test is complete
            });
    });

    it('should return user policies when user exists', async () => {
        const req = {
            body: { email: 'test@example.com' }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        const mockUser = {
            currentPolicies: [
                { beneficiaryDetails: 'John Doe', type: 'Life Insurance', name: 'Policy 1', amount: 100000, term: 10, status: 'Active' },
                { beneficiaryDetails: 'Jane Doe', type: 'Health Insurance', name: 'Policy 2', amount: 50000, term: 5, status: 'Active' }
            ]
        };
        User.findOne = jest.fn().mockResolvedValue(mockUser);

        await GetMyPolicies(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ currentPolicies: mockUser.currentPolicies });
    });

    it('should return 404 if user does not exist', async () => {
        const req = {
            body: { email: 'nonexistent@example.com' }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        User.findOne = jest.fn().mockResolvedValue(null);

        await GetMyPolicies(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 if an error occurs', async () => {
        const req = {
            body: { email: 'test@example.com' }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

        await GetMyPolicies(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
});
