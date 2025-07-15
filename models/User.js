const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'custom'], required: true },
    phone: { type: String, required: true },
    profileImage: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    username: { type: String, unique: true },
    usernameLastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.username) return next()

    const base = `${this.firstName}.${this.lastName}`.toLowerCase().replace(/[^a-zA-Z0-9.]/g, '');
    let username;
    let exists;

    do {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        username = `${base}${randomNum}`;
        exists = await mongoose.models.User.findOne({ username });
    }
    while (exists)

    this.username = username;
    next();
});

module.exports = mongoose.model('User', userSchema);