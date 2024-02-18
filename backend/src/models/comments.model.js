import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },

}, { timestamps: true });

const commentModel = mongoose.model('Comment', CommentSchema);

export default commentModel;