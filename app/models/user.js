const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true, },
    roles: { type: [String], default: ['USER'] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    teams: { type: [Types.ObjectId], default: [] },
    token: { type: String, default: '' },
},
    {
        timestamps: true
    }
);

const userModel = model('user', userSchema);


module.exports = {
    userModel
}