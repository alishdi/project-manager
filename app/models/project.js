const { Schema, model, Types } = require('mongoose');

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String, default: '/defaults/default.png'},
    owner: { type: Types.ObjectId, required: true },
    team: { type: Types.ObjectId },
    private: { type: Boolean, default: true },

},
    {
        timestamps: true
    }
);

const projectModel = model('team', ProjectSchema);


module.exports = {
    projectModel
}