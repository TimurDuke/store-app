const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');

const { Schema, model } = mongoose;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async value => {
                const user = await User.findOne({username: value});

                if (user) return false;
            },
            message: 'This user is already registered',
        }
    },
    password: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: async value => {
                const user = await User.findOne({phone: parseInt(value)});

                if (user) return false;
            },
            message: 'This phone is already registered',
        }
    },
    token: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    return this.token = nanoid();
};

const User = model("User", UserSchema);

module.exports = User;