import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { timestamps: true });

const commentModel = mongoose.model('Comment', CommentSchema);

export default commentModel;