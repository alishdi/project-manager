const { Schema, model, Types } = require('mongoose');

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String, required: true },
    owner: { type: Types.ObjectId, required: true },
    team: { type: Types.ObjectId },
    private: { type: Boolean, default: true },
    tags: { type: [String], default: [] }

}, {
    timestamps: true
}
);

const ProjectModel = model('project', ProjectSchema);


module.exports = {
    ProjectModel
}