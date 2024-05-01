// Require necessary modules
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const SuperAdmin = require('../models/SuperAdmin');

// Connect to MongoDB database
mongoose.connect('mongodb+srv://dattasandeep000:13072003@sandy.p06ijgx.mongodb.net/G1?retryWrites=true&w=majority/G1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Assuming you have the details of the super admin
const superAdminDetails = {
  name: 'Manohar',
  email: 'gmanohariiits@gmail.com',
  age: '35',
  sex: 'Male',
  address: '123 Main Street',
  phone: '123-456-7890',
  password: 'gMANOHAR@12' // Plain text password
};

// Generate a salt
bcrypt.genSalt(10, (err, salt) => {
  if (err) {
    console.error('Error generating salt:', err);
    // Handle error
    return;
  }

  // Hash the password using the generated salt
  bcrypt.hash(superAdminDetails.password, salt, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      // Handle error
      return;
    }

    // Replace the plain text password with the hashed password
    superAdminDetails.password = hash;

    // Create a new instance of the SuperAdmin model with the details
    const superAdmin = new SuperAdmin(superAdminDetails);

    // Save the super admin to the database
    superAdmin.save()
      .then(savedSuperAdmin => {
        console.log('Super Admin saved successfully:', savedSuperAdmin);
        // Handle success, if needed
      })
      .catch(error => {
        console.error('Error saving Super Admin:', error);
        // Handle error, if needed
      });
  });
});
