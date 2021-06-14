const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Name is required!'],
        },
        email: {
            type: String,
            require: [true, 'Email is required!'],
        },
        password: {
            type: String,
            require: [true, 'Password is required!'],
        },
        isAdmin: {
            type: Boolean,
            require: true,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
