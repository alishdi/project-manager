const { Schema, model, Types } = require('mongoose');

const InviteRequests = new Schema({
    teamID: { type: Types.ObjectId, required: true },
    caller: { type: String, required: true, lowercase: true },
    requestDate: { type: Date, default: new Date() },
    status: { type: String, default: "pending" }

})

const userSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true, unique: true, },
    roles: { type: [String], default: ['USER'] },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profile_image: { type: String, required: true },
    skills: { type: [String], default: [] },
    teams: { type: [Types.ObjectId], default: [] },
    token: { type: String, default: '' },
    inviteRequests: {type: [InviteRequests],maxLength:1 }
},
    {
        timestamps: true
    }
);

const userModel = model('user', userSchema);


module.exports = {
    userModel
}