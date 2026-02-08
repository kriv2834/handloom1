import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: function () {
            return this.role !== 'guest';
        }
    },

    role: {
        type: String,
        enum: ['guest', 'customer', 'artisan'],
        default: 'customer'
    },

    phone: {
        type: String
    },

    address: {
        type: String
    },

    artisanProfile: {
        bio: String,
        experience: Number,
        specialization: String
    }

}, { timestamps: true });

/* Password hashing */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
