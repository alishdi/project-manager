const { Schema, model, Types } = require('mongoose');

const TeamSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    users: { type: [Types.ObjectId], default: [] },
    owner: { type: Types.ObjectId, required: true },

},
    {
        timestamps: true
    }
);

const teamModel = model('team', TeamSchema);


module.exports = {
    teamModel
}