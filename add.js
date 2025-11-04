require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Update these with your admin details
    const adminData = {
      name: 'Nathi',
      username: 'Nathi1234',
      email: 'dmoodley1997@gmail.com',
      password: 'devendran123',
    };

    // Check if admin already exists
    const existing = await User.findOne({ email: adminData.email });
    if (existing) {
      console.log('⚠️ Admin user already exists');
      process.exit(0);
    }

    const admin = new User(adminData);
    await admin.save();

    console.log('✅ Admin user created successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdminUser();
